"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "./MessageBubble"
import { ChatInput } from "./ChatInput"
import { WelcomeScreen } from "./WelcomeScreen"
import { useAIChat } from "@/app/lib/hooks/useAIChat"
import { useGetChat } from "@/app/lib/queries/ai.queries"

interface ChatAreaProps {
  chatId: string | null
  onChatCreated: (id: string, title: string) => void
}

export function ChatArea({ chatId, onChatCreated }: ChatAreaProps) {
  const {
    messages,
    sendMessage,
    status,
    hookChatId,
    setChatId,
    setMessages,
    resetChat,
  } = useAIChat()

  const { data: existingChat } = useGetChat(chatId)
  const bottomRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef<string | null>(null)
  const notifiedRef = useRef<string | null>(null)
  const isLoading = status === "streaming" || status === "submitted"

  // Notify parent ONCE when new chat is created
  useEffect(() => {
    if (hookChatId && !chatId && notifiedRef.current !== hookChatId) {
      notifiedRef.current = hookChatId
      const firstUser = messages.find((m) => m.role === "user")
      const title = firstUser?.parts?.find((p) => p.type === "text")?.text?.slice(0, 50) ?? "New Chat"
      onChatCreated(hookChatId, title)
    }
  }, [hookChatId, chatId, onChatCreated])

  // Load existing chat from DB (once per chatId)
  useEffect(() => {
    if (existingChat && chatId && loadedRef.current !== chatId) {
      loadedRef.current = chatId
      setChatId(chatId)
      setMessages(
        existingChat.messages.map((m) => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          parts: [{ type: "text" as const, text: m.content }],
        }))
      )
    }
  }, [chatId, existingChat, setChatId, setMessages])

  // Reset when "New Chat" clicked
  useEffect(() => {
    if (!chatId) {
      loadedRef.current = null
      notifiedRef.current = null
      resetChat()
    }
  }, [chatId, resetChat])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (text: string, fileUrl?: string) => {
    const content = fileUrl ? `${text}\n\n[File: ${fileUrl}]` : text
    sendMessage({ text: content })
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-950 relative">
      {messages.length === 0 ? (
        <WelcomeScreen onSuggestion={(text) => sendMessage({ text })} />
      ) : (
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} isUser={m.role === "user"} />
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-7 h-7 bg-rose-500/15 border border-rose-500/25 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <div className="w-3.5 h-3.5 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div className="bg-slate-800/70 border border-slate-700/40 px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1.5 items-center h-4">
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </ScrollArea>
        </div>
      )}

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  )
}