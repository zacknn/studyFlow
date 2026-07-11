"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageSquare, Plus, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useListChat, useDeleteChat } from "@/app/lib/queries/ai.queries"

export function ChatSidebar({
  activeChatId,
  onActiveChatDeleted,
}: {
  activeChatId: string | null
  onActiveChatDeleted: () => void
}) {
  const { data: chats } = useListChat()
  const deleteChat = useDeleteChat()
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  function confirmDelete() {
    if (!pendingDeleteId) return
    const id = pendingDeleteId
    setPendingDeleteId(null)
    deleteChat.mutate(
      { id },
      {
        onSuccess: () => {
          if (id === activeChatId) onActiveChatDeleted()
        },
      }
    )
  }

  return (
    <aside className="flex w-72 shrink-0 flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800">
        <Link
          href="/dashboard/chatbot"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium py-2.5 text-sm shadow-md shadow-rose-200 dark:shadow-none transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          New chat
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {chats?.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-slate-400 dark:text-slate-500">
            No conversations yet. Start one above.
          </p>
        )}

        <div className="flex flex-col gap-1">
          {chats?.map((chat) => {
            const isActive = chat.id === activeChatId
            return (
              <div key={chat.id} className="group relative">
                <Link
                  href={`/dashboard/chatbot?chat=${chat.id}`}
                  scroll={false}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-3 py-2.5 pr-8 text-sm transition-colors",
                    isActive
                      ? "border-rose-100 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      : "border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  <MessageSquare className="w-4 h-4 shrink-0 opacity-60" />
                  <span className="truncate">{chat.title || "New conversation"}</span>
                </Link>
                <button
                  onClick={() => setPendingDeleteId(chat.id)}
                  aria-label="Delete chat"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 opacity-0 transition-opacity hover:text-rose-500 group-hover:opacity-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {pendingDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl shadow-slate-200 dark:shadow-slate-950/50">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Delete this conversation?
              </h3>
              <button
                onClick={() => setPendingDeleteId(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                aria-label="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              This removes the chat and its messages. This can't be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPendingDeleteId(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-rose-500 hover:bg-rose-600 text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
