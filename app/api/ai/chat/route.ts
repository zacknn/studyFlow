import { google } from "@ai-sdk/google"
import { streamText, convertToModelMessages, UIMessage } from "ai"
import { auth } from "@/app/lib/auth"
import { headers } from "next/headers"
import prisma from "@/app/lib/prisma"

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { messages, chatId }: { messages: UIMessage[]; chatId: string | null } = await req.json()

  const lastUserMessage = messages
    .filter((m) => m.role === "user")
    .at(-1)?.parts
    ?.find((p) => p.type === "text")?.text ?? ""

  // Create chat BEFORE streaming
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
    messages: await convertToModelMessages(messages),
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

  // ── ai@7: built-in method, no extra imports needed ──
  const response = result.toUIMessageStreamResponse()

  // Inject X-Chat-Id header
  const responseHeaders = new Headers(response.headers)
  if (savedChatId) {
    responseHeaders.set("X-Chat-Id", savedChatId)
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  })
}