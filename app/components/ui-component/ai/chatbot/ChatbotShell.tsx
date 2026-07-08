"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { ChatSidebar } from "./chat-sidebar"
import { ChatWindow } from "./chat-window"
import type { ChatDetail, ChatSummary } from "@/app/types/index"

export function ChatbotShell({
  initialChats,
  initialActiveChat,
  activeChatId,
}: {
  initialChats: ChatSummary[]
  initialActiveChat: ChatDetail | null
  activeChatId: string | null
}) {
  const router = useRouter()

  // Imperative navigation for events that aren't a direct link click
  // (a chat finishing its first stream, a chat being deleted while active).
  const goToChat = useCallback(
    (id: string | null) => {
      router.replace(id ? `/dashboard/chatbot?chat=${id}` : "/dashboard/chatbot", { scroll: false })
    },
    [router]
  )

  return (
    <div className="flex h-[calc(100vh-20rem)] min-h-[560px] gap-6">
      <ChatSidebar initialChats={initialChats} activeChatId={activeChatId} onActiveChatDeleted={() => goToChat(null)} />
      <ChatWindow
        key={activeChatId ?? "new"}
        chatId={activeChatId}
        initialChat={initialActiveChat}
        onChatCreated={goToChat}
      />
    </div>
  )
}