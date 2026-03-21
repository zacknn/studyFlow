"use client"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"  // import this
import { useState } from "react"

export function useAIChat(postId?: string) {
  const [chatId, setChatId] = useState<string | null>(null)

  const chat = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai/chat",        
      body: { postId, chatId },   
    }),
  })

  return { ...chat, chatId, setChatId }
}