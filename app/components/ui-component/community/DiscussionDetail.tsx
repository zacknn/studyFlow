"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Tag, Trash2, Pencil, Loader2, MessageSquare } from "lucide-react"
import { useGetDiscussion, useDeleteDiscussion } from "@/app/lib/queries/discussion.queries"
import { CommentCard } from "./CommentCard"
import { CommentForm } from "./CommentForm"
import { authClient } from "@/app/lib/auth-client"
import { useState } from "react"
import { DeleteConfirmModal } from "./DeleteConfirmModal"

export function DiscussionDetail({ discussionId }: { discussionId: string }) {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const { data: discussion, isLoading, isError } = useGetDiscussion(discussionId)
  const { mutate: deleteDiscussion, isPending: isDeleting } = useDeleteDiscussion()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const isOwner = session?.user.id === discussion?.authorId

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse space-y-4">
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded" />
      </div>
    )
  }

  if (isError || !discussion) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <p className="text-slate-500 mb-3">Discussion not found</p>
        <Link href="/dashboard/community" className="text-rose-500 text-sm hover:text-rose-600 transition">
          ← Back to community
        </Link>
      </div>
    )
  }

  return (
    <>
      {showDeleteModal && (
        <DeleteConfirmModal
          title="Delete Discussion"
          description="This will permanently delete the discussion and all its comments."
          onConfirm={() => deleteDiscussion(
            { id: discussionId },
            { onSuccess: () => router.push("/dashboard/community") }
          )}
          onCancel={() => setShowDeleteModal(false)}
          isPending={isDeleting}
        />
      )}

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Back */}
        <Link
          href="/dashboard/community"
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Community
        </Link>

        {/* Discussion */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-6"
        >
          {/* Author + actions */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {discussion.author.image ? (
                <img
                  src={discussion.author.image}
                  alt={discussion.author.name ?? "User"}
                  className="w-10 h-10 rounded-full object-cover border-2 border-rose-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shrink-0">
                  <span className="text-white font-semibold">
                    {discussion.author.name?.charAt(0).toUpperCase() ?? "U"}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">
                  {discussion.author.name ?? "Anonymous"}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(discussion.createdAt).toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric"
                  })}
                </p>
              </div>
            </div>

            {/* Owner actions */}
            {isOwner && (
              <div className="flex items-center gap-2">
                <Link
                  href={`/dashboard/community/${discussionId}/edit`}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg transition"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 px-3 py-1.5 border border-red-200 dark:border-red-900/30 rounded-lg transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            {discussion.title}
          </h1>

          {/* Content */}
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap mb-4">
            {discussion.content}
          </p>

          {/* Tags */}
          {discussion.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {discussion.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Comments section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-4 h-4 text-slate-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">
              {discussion.comments.length} Comment{discussion.comments.length !== 1 ? "s" : ""}
            </h2>
          </div>

          {/* Comment form */}
          <div className="mb-6">
            <CommentForm discussionId={discussionId} />
          </div>

          {/* Comments list */}
          {discussion.comments.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <p className="text-sm text-slate-400">
                No comments yet — be the first to reply!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {discussion.comments.map((comment, i) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  index={i}
                  discussionAuthorId={discussion.authorId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}