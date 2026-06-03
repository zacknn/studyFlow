"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Pencil, Check, X } from "lucide-react"
import { AuthorBadge } from "@/app/components/ui-component/AuthorBadge"
import { useDeleteComment } from "@/app/lib/queries/discussion.queries"
import { authClient } from "@/app/lib/auth-client"
import type { Comment } from "@/app/schemas/discussion.schemas"

export function CommentCard({
  comment,
  index,
  discussionAuthorId,
}: {
  comment: Comment
  index: number
  discussionAuthorId: string
}) {
  const { data: session } = authClient.useSession()
  const { mutate: deleteComment } = useDeleteComment(comment.discussionId)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)

  const isOwner = session?.user.id === comment.authorId
  const isDiscussionAuthor = comment.authorId === discussionAuthorId

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex gap-3"
    >
      {/* Left — avatar */}
      <div className="shrink-0 pt-1">
        {comment.author.image ? (
          <img
            src={comment.author.image}
            alt={comment.author.name ?? "User"}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold">
              {comment.author.name?.charAt(0).toUpperCase() ?? "U"}
            </span>
          </div>
        )}
      </div>

      {/* Right — content */}
      <div className="flex-1 min-w-0">
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl rounded-tl-none px-4 py-3">

          {/* Author name + badge */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {comment.author.name ?? "Anonymous"}
            </span>
            {isDiscussionAuthor && (
              <span className="text-xs px-2 py-0.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full font-medium">
                Author
              </span>
            )}
            <span className="text-xs text-slate-400 ml-auto">
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric"
              })}
            </span>
          </div>

          {/* Content or edit mode */}
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                rows={3}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-400 transition resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition"
                >
                  <Check className="w-3.5 h-3.5" /> Save
                </button>
                <button
                  onClick={() => { setIsEditing(false); setEditContent(comment.content) }}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-500 transition"
                >
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          )}
        </div>

        {/* Actions — owner only */}
        {isOwner && !isEditing && (
          <div className="flex items-center gap-3 mt-1.5 px-1">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
            >
              <Pencil className="w-3 h-3" /> Edit
            </button>
            <button
              onClick={() => deleteComment({ id: comment.id })}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 transition"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}