"use client"
import { useState } from "react"
import { AISidebar } from "./AISidebar"
import { ChatArea } from "./ChatArea"

export function AIChatContainer() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null)

  return (
    <div className="flex h-full">
      <AISidebar
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={() => setActiveChatId(null)}
      />
      <ChatArea
        chatId={activeChatId}
        onChatCreated={setActiveChatId}
      />
    </div>
  )
}