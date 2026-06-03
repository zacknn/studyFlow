"use client"
import { useState } from "react"
import { Loader2, Send } from "lucide-react"
import { useCreateComment } from "@/app/lib/queries/discussion.queries"
import { authClient } from "@/app/lib/auth-client"

export function CommentForm({ discussionId }: { discussionId: string }) {
  const { data: session } = authClient.useSession()
  const [content, setContent] = useState("")
  const { mutate, isPending } = useCreateComment()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    mutate(
      { discussionId, content },
      { onSuccess: () => setContent("") }
    )
  }

  if (!session) {
    return (
      <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
        <p className="text-sm text-slate-500">
          <a href="/login" className="text-rose-500 hover:text-rose-600 transition">
            Sign in
          </a>
          {" "}to join the discussion
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      {/* Avatar */}
      <div className="shrink-0 pt-1">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name ?? "You"}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold">
              {session.user.name?.charAt(0).toUpperCase() ?? "U"}
            </span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex-1 flex gap-2 items-end bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-rose-400 rounded-2xl px-4 py-3 transition-colors">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e as any)
            }
          }}
          placeholder="Write a comment... (Shift+Enter for new line)"
          rows={1}
          disabled={isPending}
          className="flex-1 bg-transparent text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-400 outline-none resize-none max-h-32 disabled:opacity-50"
          style={{ scrollbarWidth: "none" }}
        />
        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="shrink-0 w-8 h-8 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition"
        >
          {isPending
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <Send className="w-3.5 h-3.5" />
          }
        </button>
      </div>
    </form>
  )
}