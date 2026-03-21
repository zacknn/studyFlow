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

  const { messages, postId } = await req.json();

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

  // stream the response
  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: systemPrompt,
    messages, // full conversation history
    onFinish: async ({ text }) => {
      // save to AIHistory after response completes
      await prisma.aIHistory.create({
        data: {
          inputText: messages[messages.length - 1].content,
          responseText: text,
          userId: session.user.id,
        },
      });
    },
  });

  return result.toTextStreamResponse();
}
