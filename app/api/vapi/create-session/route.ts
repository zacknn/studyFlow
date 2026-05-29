import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { postId } = await req.json()

  // build context from post
  let systemPrompt = `You are a friendly and encouraging AI study tutor for StudyFlow.
  Your job is to help students understand their study materials.
  Keep your responses concise since this is a voice conversation — no long paragraphs.
  Use simple language and give examples when explaining concepts.
  Be encouraging and patient.`

  let firstMessage = "Hi! I'm your AI study tutor. What would you like to learn about today?"

  if (postId) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { files: true }
    })

    if (post) {
      systemPrompt = `You are a friendly AI study tutor helping a student with "${post.title}".
      ${post.description ? `The material is about: ${post.description}` : ""}
      ${post.tags.length > 0 ? `Topics covered: ${post.tags.join(", ")}` : ""}
      ${post.files.length > 0 ? `The student has these files: ${post.files.map(f => f.name).join(", ")}` : ""}
      
      Your job:
      - Explain concepts from this material clearly
      - Quiz the student when they ask
      - Give examples to make things stick
      - Keep responses SHORT since this is voice — max 3 sentences per response
      - Be encouraging and patient`

      firstMessage = `Hi! I'm your AI tutor for "${post.title}". I'm here to help you understand the material. What would you like to start with?`
    }
  }

  // create a dynamic assistant via Vapi REST API
  const response = await fetch("https://api.vapi.ai/assistant", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `StudyFlow Tutor`,
      firstMessage,
      model: {
        provider: "google",
        model: "gemini-2.5-flash",
        systemPrompt,
      },
      voice: {
        provider: "openai",
        voiceId: "nova",  // friendly female voice
      },
      transcriber: {
        provider: "openai",
        model: "whisper-1",
      },
      // end call if silent for 30 seconds
      silenceTimeoutSeconds: 30,
      // max call length 10 minutes
      maxDurationSeconds: 600,
    }),
  })

  if (!response.ok) {
    return Response.json({ error: "Failed to create assistant" }, { status: 500 })
  }

  const assistant = await response.json()
  return Response.json({ assistantId: assistant.id })
}