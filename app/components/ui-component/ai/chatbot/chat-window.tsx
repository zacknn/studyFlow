"use client"

import { useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { AlertTriangle, ArrowUp, FileText, Loader2, MoreHorizontal, Paperclip, Square, X } from "lucide-react"
import { orpc } from "@/app/lib/orpc"
import { useAIChat } from "@/app/lib/hooks/useAIChat"
import { useGetChat } from "@/app/lib/queries/ai.queries"
import { useUploadThing } from "@/app/lib/uploadthing"
import { ACCEPTED_UPLOAD_DESCRIPTION, isAllowedUploadFile } from "@/app/lib/file-upload"
import { MessageBubble } from "./message-bubble"
import { ChatEmptyState } from "./chat-empty-state"

export function ChatWindow({
  chatId,
  onChatCreated,
}: {
  chatId: string | null
  onChatCreated: (id: string) => void
}) {
  const queryClient = useQueryClient()
  const { data: existingChat, isLoading: isLoadingHistory } = useGetChat(chatId)
  const { messages, sendMessage, status, stop, setMessages, setChatId, hookChatId } = useAIChat()

  const [input, setInput] = useState("")
  const [uploadedFile, setUploadedFile] = useState<{ url: string; name: string } | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [warning, setWarning] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const hydratedRef = useRef(false)
  const navigatedRef = useRef(false)
  const prevStatusRef = useRef(status)

  // Hydrate an existing conversation once its messages arrive.
  useEffect(() => {
    if (chatId && existingChat && !hydratedRef.current) {
      hydratedRef.current = true
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

  // Once a brand-new chat has finished streaming its first reply, move the URL to it.
  // Waiting for "ready" avoids remounting this component mid-stream.
  useEffect(() => {
    if (!navigatedRef.current && hookChatId && hookChatId !== chatId && status === "ready" && messages.length > 0) {
      navigatedRef.current = true
      onChatCreated(hookChatId)
    }
  }, [hookChatId, chatId, status, messages.length, onChatCreated])

  // Refresh the sidebar list once a reply finishes streaming (title, ordering).
  useEffect(() => {
    if (prevStatusRef.current === "streaming" && status === "ready") {
      queryClient.invalidateQueries({ queryKey: orpc.AI.listChats.key() })
    }
    prevStatusRef.current = status
  }, [status, queryClient])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, status])

  const isStreaming = status === "streaming" || status === "submitted"
  const isBusy = isStreaming || isUploading
  const showEmptyState = messages.length === 0 && !isLoadingHistory
  const title = existingChat?.title || (chatId ? "Conversation" : "New conversation")

  const { startUpload } = useUploadThing("postFile", {
    onClientUploadComplete: (res) => {
      setUploadedFile({ url: res[0].url, name: res[0].name })
      setIsUploading(false)
      setWarning(null)
    },
    onUploadError: (error) => {
      console.error("File upload failed:", error)
      setIsUploading(false)
    },
  })

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!isAllowedUploadFile(file)) {
      setWarning(`${file.name} cannot be uploaded. ${ACCEPTED_UPLOAD_DESCRIPTION}`)
      e.target.value = ""
      return
    }

    setWarning(null)
    setIsUploading(true)
    await startUpload([file])
    e.target.value = ""
  }

  function handleSend(text?: string) {
    const value = (text ?? input).trim()
    if ((!value && !uploadedFile) || isBusy) return
    const content = [value, uploadedFile ? `[File: ${uploadedFile.url}]` : ""]
      .filter(Boolean)
      .join("\n\n")
    sendMessage({ text: content })
    setInput("")
    setUploadedFile(null)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-[min(640px,calc(100svh-15rem))] min-h-[440px] min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 sm:h-auto sm:min-h-0">
      {/* Header, modeled on the StudyBot mockup */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-5 sm:py-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300 truncate">{title}</span>
        </div>
        <MoreHorizontal className="w-4 h-4 text-slate-400 dark:text-slate-600 shrink-0" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex h-full max-w-2xl flex-col gap-5 px-3 py-5 sm:px-5 sm:py-6">
          {isLoadingHistory ? (
            <div className="flex flex-1 items-center justify-center gap-2 text-sm text-slate-400 dark:text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading conversation…
            </div>
          ) : showEmptyState ? (
            <ChatEmptyState onPick={(prompt) => handleSend(prompt)} />
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {status === "submitted" && (
                <div className="flex items-center gap-3 pl-11">
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-slate-800 px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input, styled after the mockup's input bar */}
      <div className="border-t border-slate-100 p-3 dark:border-slate-800 sm:p-4">
        <div className="mx-auto max-w-2xl">
          {warning && (
            <div role="alert" className="mb-2 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/20 dark:text-amber-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{warning}</span>
            </div>
          )}
          {uploadedFile && (
            <div className="mb-2 flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
              <FileText className="h-4 w-4 shrink-0 text-rose-400" />
              <span className="max-w-[180px] truncate text-xs text-slate-600 dark:text-slate-300">{uploadedFile.name}</span>
              <button type="button" aria-label="Remove attached file" onClick={() => setUploadedFile(null)} className="text-slate-500 hover:text-rose-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a follow-up question..."
              rows={1}
              disabled={isBusy}
              className="max-h-40 min-h-[48px] w-full resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-3 pl-4 pr-20 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none transition-colors focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:focus:ring-rose-500/20"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={isBusy}
              aria-label="Attach a file"
              className="absolute right-11 top-2 rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:text-rose-500 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:hover:text-rose-400"
            >
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
            </button>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.txt,.md,.csv"
            />
            {isStreaming ? (
              <button
                onClick={() => stop()}
                aria-label="Stop generating"
                className="absolute right-2 top-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1.5 text-slate-500 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <Square className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleSend()}
                disabled={isBusy || (!input.trim() && !uploadedFile)}
                aria-label="Send message"
                className="absolute right-2 top-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1.5 text-slate-400 transition-colors hover:text-rose-500 disabled:opacity-40 disabled:hover:text-slate-400 dark:hover:text-rose-400"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-400 dark:text-slate-600">
            Responses are AI-generated — double-check anything important.
          </p>
        </div>
      </div>
    </div>
  )
}