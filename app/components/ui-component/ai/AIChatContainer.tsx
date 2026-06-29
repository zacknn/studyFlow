"use client"

import { useState } from "react"
import { AISidebar } from "./AISidebar"
import { ChatArea } from "./ChatArea"

interface Chat {
  id: string
  title: string | null
  updatedAt: Date
}

interface AIChatContainerProps {
  userId: string | null
  initialChats: Chat[]
}

export function AIChatContainer({ userId, initialChats }: AIChatContainerProps) {
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [chats, setChats] = useState<Chat[]>(initialChats)

  const handleChatCreated = (id: string, title: string) => {
    setActiveChatId(id)
    setChats(prev => [{ id, title, updatedAt: new Date() }, ...prev])
  }

  const handleDeleteChat = (id: string) => {
    setChats(prev => prev.filter(c => c.id !== id))
    if (activeChatId === id) setActiveChatId(null)
  }

  if (!userId) {
    return (
      <div className="flex h-full items-center justify-center text-slate-500">
        Please sign in to use the AI Tutor.
      </div>
    )
  }

  return (
    <div className="flex h-full">
      <AISidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={() => setActiveChatId(null)}
        onDeleteChat={handleDeleteChat}
      />
      <ChatArea
        chatId={activeChatId}
        onChatCreated={handleChatCreated}
      />
    </div>
  )
}