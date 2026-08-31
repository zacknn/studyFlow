"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"

export function useAIChat() {
  const [chatId, setChatId] = useState<string | null>(null)

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/ai/chat",
        prepareSendMessagesRequest: ({ messages }) => ({
          body: {
            messages,
            chatId,
          },
        }),
        fetch: async (url, options) => {
          const response = await fetch(url, options)
          const newChatId = response.headers.get("X-Chat-Id")
          if (newChatId && newChatId !== chatId) {
            setChatId(newChatId)
          }
          return response
        },
      }),
    [chatId],
  )

  const chat = useChat({
    transport,
  })

  // Stable resetChat — no dependency on changing `chat` object
  const setMessagesRef = useRef(chat.setMessages)
  useEffect(() => {
    setMessagesRef.current = chat.setMessages
  }, [chat.setMessages])

  const resetChat = useCallback(() => {
    setChatId(null)
    setMessagesRef.current([])
  }, [])

  return {
    ...chat,
    hookChatId: chatId,
    setChatId,
    resetChat,
  }
}