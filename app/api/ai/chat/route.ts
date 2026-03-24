import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import prisma from "@/app/lib/prisma";


export async function POST(req: Request) {
  // check auth
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { messages, postId, chatId } = body;

  const formattedMessages = messages
    .map((m: any) => ({
      role: m.role,
      content: m.parts
        ? m.parts.map((p: any) => p.text ?? "").join("")
        : (m.content ?? ""),
    }))
    .filter((m: any) => m.content);

  // build system prompt
  let systemPrompt = `You are a helpful AI study assistant. 
  Help students understand concepts clearly and simply.
  Keep responses concise and educational.`;

  if (postId) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { files: true }
    })
    if (post) {
      systemPrompt = `You are a helpful AI study assistant helping with "${post.title}".
      ${post.description ? `About: ${post.description}` : ""}
      ${post.tags.length > 0 ? `Topics: ${post.tags.join(", ")}` : ""}
      Be clear, concise and encouraging.`
    }
  }

  const lastUserMessage = formattedMessages
    .filter((m: any) => m.role === "user")
    .at(-1)?.content ?? ""

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: systemPrompt,
    messages: formattedMessages,
    onFinish: async ({ text }) => {
      try {
        let savedChatId = chatId

        if (chatId) {
          // existing chat — just add new messages
          await prisma.aIMessage.createMany({
            data: [
              { chatId, role: "user", content: lastUserMessage },
              { chatId, role: "assistant", content: text },
            ]
          })
        } else {
          // new chat — create session + messages
          const newChat = await prisma.aIHistory.create({
            data: {
              userId: session.user.id,
              postId: postId ?? null,
              title: lastUserMessage.slice(0, 50),
              messages: {
                create: [
                  { role: "user", content: lastUserMessage },
                  { role: "assistant", content: text },
                ]
              }
            }
          })
          savedChatId = newChat.id
        }

      } catch (err) {
        console.error("Failed to save chat:", err)
      }
    }
  })

  return result.toTextStreamResponse();
}
