import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"
import type { UIMessage } from "ai"

export function MessageBubble({ message, index }: {
  message: UIMessage
  index: number
}) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="shrink-0 w-7 h-7 bg-rose-500/15 border border-rose-500/25 rounded-full flex items-center justify-center mt-1">
          <Bot className="w-3.5 h-3.5 text-rose-400" />
        </div>
      )}

      <motion.div
        whileHover={{ scale: 1.005 }}
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-rose-500 text-white rounded-tr-sm shadow-lg shadow-rose-500/20"
            : "bg-slate-800/70 border border-slate-700/40 text-slate-200 rounded-tl-sm"
        }`}
      >
        {message.parts?.map((part, i) =>
          part.type === "text" ? (
            <span key={i} className="whitespace-pre-wrap">{part.text}</span>
          ) : null
        )}
      </motion.div>

      {isUser && (
        <div className="shrink-0 w-7 h-7 bg-slate-700/80 rounded-full flex items-center justify-center mt-1">
          <User className="w-3.5 h-3.5 text-slate-300" />
        </div>
      )}
    </motion.div>
  )
}