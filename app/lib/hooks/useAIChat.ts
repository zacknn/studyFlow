"use client"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState, useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { orpc } from "../orpc"

export function useAIChat(postId?: string) {
  const [chatId, setChatId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const chat = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai/chat",
      body: { postId, chatId },
    }),
    onFinish: () => {
      // refresh sidebar chat list when message finishes
      queryClient.invalidateQueries({
        queryKey: orpc.AI.listChats.key()
      })
    },
  })

  const resetChat = useCallback(() => {
    setChatId(null)
    chat.setMessages([])
  }, [chat])

  return { ...chat, chatId, setChatId, resetChat }
}