import { Bot, User } from "lucide-react"
import type { UIMessage } from "ai"

interface MessageBubbleProps {
  message: UIMessage
  isUser: boolean
}

export function MessageBubble({ message, isUser }: MessageBubbleProps) {
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="shrink-0 w-7 h-7 bg-rose-500/15 border border-rose-500/25 rounded-full flex items-center justify-center mt-1">
          <Bot className="w-3.5 h-3.5 text-rose-400" />
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-rose-500 text-white rounded-tr-sm"
            : "bg-slate-800/70 border border-slate-700/40 text-slate-200 rounded-tl-sm"
        }`}
      >
        {message.parts?.map((part, i) =>
          part.type === "text" ? (
            <span key={i} className="whitespace-pre-wrap">{part.text}</span>
          ) : null
        )}
      </div>

      {isUser && (
        <div className="shrink-0 w-7 h-7 bg-slate-700/80 rounded-full flex items-center justify-center mt-1">
          <User className="w-3.5 h-3.5 text-slate-300" />
        </div>
      )}
    </div>
  )
}