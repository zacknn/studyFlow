"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState, useCallback, useRef, useEffect } from "react"

export function useAIChat() {
  const [chatId, setChatId] = useState<string | null>(null)
  const chatIdRef = useRef<string | null>(null)

  useEffect(() => {
    chatIdRef.current = chatId
  }, [chatId])

  const chat = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai/chat",
      prepareSendMessagesRequest: ({ messages }) => ({
        body: {
          messages,
          chatId: chatIdRef.current,
        },
      }),
      fetch: async (url, options) => {
        const response = await fetch(url, options)
        const newChatId = response.headers.get("X-Chat-Id")
        if (newChatId && newChatId !== chatIdRef.current) {
          setChatId(newChatId)
        }
        return response
      },
    }),
  })

  // Stable resetChat — no dependency on changing `chat` object
  const setMessagesRef = useRef(chat.setMessages)
  useEffect(() => {
    setMessagesRef.current = chat.setMessages
  }, [chat.setMessages])

  const resetChat = useCallback(() => {
    setChatId(null)
    chatIdRef.current = null
    setMessagesRef.current([])
  }, [])

  return {
    ...chat,
    hookChatId: chatId,
    setChatId,
    resetChat,
  }
}