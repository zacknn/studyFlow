"use client"
import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "./MessageBubble"
import { ChatInput } from "./ChatInput"
import { WelcomeScreen } from "./WelcomeScreen"
import { useAIChat } from "@/app/lib/hooks/useAIChat"
import { useGetChat } from "@/app/lib/queries/ai.queries"

interface ChatAreaProps {
  chatId: string | null
  onChatCreated: (id: string) => void
  postId?: string
}

export function ChatArea({ chatId, onChatCreated, postId }: ChatAreaProps) {
  const { messages, sendMessage, status, setChatId, setMessages, resetChat } = useAIChat(postId)
  const { data: existingChat } = useGetChat(chatId)  
  const bottomRef = useRef<HTMLDivElement>(null)
  const isLoading = status === "streaming" || status === "submitted"

  // when user selects existing chat from sidebar → load its messages
  useEffect(() => {
    if (existingChat && chatId) {
      setChatId(chatId)

      // convert DB messages to useChat format
      setMessages(
        existingChat.messages.map(m => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          parts: [{ type: "text" as const, text: m.content }],
          content: m.content,
        }))
      )
    }
  }, [chatId, existingChat])

  // when new chat button clicked
  useEffect(() => {
    if (!chatId) {
      resetChat()
    }
  }, [chatId])

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSend(text: string, fileUrl?: string) {
    const content = fileUrl ? `${text}\n\n[File: ${fileUrl}]` : text
    sendMessage({ text: content })
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-950">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "32px 32px"
        }}
      />

      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col min-h-0"
          >
            <WelcomeScreen onSuggestion={(text) => sendMessage({ text })} />
          </motion.div>
        ) : (
          <motion.div
            key="messages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 min-h-0"
          >
            <ScrollArea className="h-full">
              <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">
                {messages.map((m, i) => (
                  <MessageBubble key={m.id} message={m} index={i} />
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="w-7 h-7 bg-rose-500/15 border border-rose-500/25 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="w-3.5 h-3.5 border-2 border-rose-400 border-t-transparent rounded-full"
                        />
                      </div>
                      <div className="bg-slate-800/70 border border-slate-700/40 px-4 py-3 rounded-2xl rounded-tl-sm">
                        <div className="flex gap-1.5 items-center h-4">
                          {[0, 1, 2].map(i => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -4, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15
                              }}
                              className="w-1.5 h-1.5 bg-slate-500 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={bottomRef} />
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  )
}
