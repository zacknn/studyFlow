import { google } from "@ai-sdk/google"
import { streamText } from "ai"
import { auth } from "@/app/lib/auth"
import { headers } from "next/headers"
import prisma from "@/app/lib/prisma"

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { messages, chatId } = await req.json()

  const formattedMessages = messages
    .map((m: any) => ({
      role: m.role,
      content: m.parts
        ? m.parts.map((p: any) => p.text ?? "").join("")
        : (m.content ?? ""),
    }))
    .filter((m: any) => m.content)

  const lastUserMessage = formattedMessages
    .filter((m: any) => m.role === "user")
    .at(-1)?.content ?? ""

  // Create chat BEFORE streaming so client gets the ID immediately
  let savedChatId = chatId
  if (!savedChatId) {
    const newChat = await prisma.aIHistory.create({
      data: {
        userId: session.user.id,
        title: lastUserMessage.slice(0, 50),
      },
    })
    savedChatId = newChat.id
  }

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: "You are a helpful AI study assistant. Be clear, concise, and encouraging.",
    messages: formattedMessages,
    onFinish: async ({ text }) => {
      try {
        await prisma.aIMessage.createMany({
          data: [
            { chatId: savedChatId, role: "user", content: lastUserMessage },
            { chatId: savedChatId, role: "assistant", content: text },
          ],
        })
      } catch (err) {
        console.error("Failed to save chat:", err)
      }
    },
  })

  // Return stream with chat ID in header
  const streamResponse = result.toTextStreamResponse()
  const responseHeaders = new Headers(streamResponse.headers)
  if (savedChatId) {
    responseHeaders.set("X-Chat-Id", savedChatId)
  }

  return new Response(streamResponse.body, {
    status: streamResponse.status,
    statusText: streamResponse.statusText,
    headers: responseHeaders,
  })
}