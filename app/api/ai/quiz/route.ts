import { google } from "@ai-sdk/google"
import { streamText } from "ai"
import { auth } from "@/app/lib/auth"
import { headers } from "next/headers"

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { fileUrl, count = 5 } = await req.json()

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Generate ${count} multiple choice questions from this document.
            Format each question exactly like this:
            
            Q1: [question]
            A) [option]
            B) [option]
            C) [option]
            D) [option]
            Answer: [correct letter]
            Explanation: [why this is correct]
            
            Make questions that test real understanding, not just memorization.`
          },
          {
            type: "file",
            data: fileUrl,
            mediaType: "application/pdf",
          }
        ]
      }
    ]
  })

  return result.toTextStreamResponse()
}