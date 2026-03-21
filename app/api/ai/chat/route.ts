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

  const { messages, postId, chatId } = await req.json();

  // if the post id provided , get post context
  let systemPrompt = `You are a helpful AI study assistant. 
  Help students understand concepts clearly and simply.
  Keep responses concise and educational.`;

  if (postId) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { files: true, links: true },
    });
    if (post) {
      systemPrompt = `You are a helpful AI study assistant helping a student with "${post.title}".
      ${post.description ? `The post is about: ${post.description}` : ""}
      ${post.tags.length > 0 ? `Topics covered: ${post.tags.join(", ")}` : ""}
      ${post.files.length > 0 ? `Available files: ${post.files.map((f) => f.name).join(", ")}` : ""}
      
      Help the student understand the material. Be clear, concise, and encouraging.`;
    }
  }

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: systemPrompt,
    messages,
    onFinish: async ({ text }) => {
      if (chatId) {
        // existing chat — just add the new messages
        await prisma.aIMessage.createMany({
          data: [
            {
              chatId,
              role: "user",
              content: messages[messages.length - 1].content,
            },
            {
              chatId,
              role: "assistant",
              content: text,
            },
          ],
        });
      } else {
        // new chat — create session + first messages together
        await prisma.aIHistory.create({
          data: {
            userId: session.user.id,
            postId: postId ?? null,
            title:
              typeof messages[0].content === "string"
                ? messages[0].content.slice(0, 50)
                : "New Chat",
            messages: {
              create: [
                {
                  role: "user",
                  content: messages[messages.length - 1].content,
                },
                {
                  role: "assistant",
                  content: text,
                },
              ],
            },
          },
        });
      }
    },
  });

  return result.toTextStreamResponse();
}
