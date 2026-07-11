"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { ChatSidebar } from "./chat-sidebar"
import { ChatWindow } from "./chat-window"

export function ChatbotShell({ activeChatId }: { activeChatId: string | null }) {
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
      <ChatSidebar activeChatId={activeChatId} onActiveChatDeleted={() => goToChat(null)} />
      <ChatWindow key={activeChatId ?? "new"} chatId={activeChatId} onChatCreated={goToChat} />
    </div>
  )
}