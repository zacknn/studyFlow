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

  const { postId, fileUrl } = await req.json()

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { files: true }
  })

  if (!post) return Response.json({ error: "Post not found" }, { status: 404 })

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Please provide a clear, structured summary of this document. 
            Include:
            - Main topic
            - Key points (bullet points)
            - Important concepts
            - Conclusion`
          },
          {
            type: "file",
            data: fileUrl,          // gemini reads the PDF directly from URL
            mediaType: "application/pdf",
          }
        ]
      }
    ]
  })

  return result.toTextStreamResponse()
}