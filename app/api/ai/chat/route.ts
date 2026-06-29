import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
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

  const lastUserMessage = formattedMessages
    .filter((m: any) => m.role === "user")
    .at(-1)?.content ?? "";

  /* ── CREATE CHAT BEFORE STREAMING ── */
  let savedChatId = chatId;
  if (!chatId) {
    const newChat = await prisma.aIHistory.create({
      data: {
        userId: session.user.id,
        postId: postId ?? null,
        title: lastUserMessage.slice(0, 50),
      },
    });
    savedChatId = newChat.id;
  }

  // build system prompt
  let systemPrompt = `You are a helpful AI study assistant. 
  Help students understand concepts clearly and simply.
  Keep responses concise and educational.`;

  if (postId) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { files: true },
    });
    if (post) {
      systemPrompt = `You are a helpful AI study assistant helping with "${post.title}".
      ${post.description ? `About: ${post.description}` : ""}
      ${post.tags.length > 0 ? `Topics: ${post.tags.join(", ")}` : ""}
      Be clear, concise and encouraging.`;
    }
  }

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: systemPrompt,
    messages: formattedMessages,
    onFinish: async ({ text }) => {
      try {
        // Chat already exists — just save the messages
        await prisma.aIMessage.createMany({
          data: [
            { chatId: savedChatId, role: "user", content: lastUserMessage },
            { chatId: savedChatId, role: "assistant", content: text },
          ],
        });
      } catch (err) {
        console.error("Failed to save chat:", err);
      }
    },
  });

  /* ── RETURN CHAT ID IN HEADER ── */
  const streamResponse = result.toTextStreamResponse();
  const responseHeaders = new Headers(streamResponse.headers);
  if (savedChatId) {
    responseHeaders.set("X-Chat-Id", savedChatId);
  }

  return new Response(streamResponse.body, {
    status: streamResponse.status,
    statusText: streamResponse.statusText,
    headers: responseHeaders,
  });
}