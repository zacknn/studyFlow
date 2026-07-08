"use client"

import { Bot } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SimpleMessage {
  id: string
  role: "user" | "assistant" | (string & {})
  parts: { type: string; text?: string }[]
}

export function MessageBubble({ message }: { message: SimpleMessage }) {
  const isUser = message.role === "user"
  const text = message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("")

  if (!text) return null

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-rose-500 px-4 py-2.5 text-sm text-white">
          <p className="whitespace-pre-wrap break-words">{text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <Bot className="h-4 w-4 text-slate-600 dark:text-slate-300" />
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm text-slate-800 dark:text-slate-200">
        <p className="whitespace-pre-wrap break-words leading-relaxed">{text}</p>
      </div>
    </div>
  )
}
