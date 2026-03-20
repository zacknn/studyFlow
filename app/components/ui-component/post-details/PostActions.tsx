"use client"
import { Heart, Eye, Pencil } from "lucide-react"
import { useIncrementLikes } from "@/app/lib/queries/post.queries"
import { authClient } from "@/app/lib/auth-client"
import Link from "next/link"
import type { Post } from "@/app/schemas/posts.schemas"

export function PostActions({ post }: { post: Post }) {
  const { data: session } = authClient.useSession()
  const { mutate: like, isPending } = useIncrementLikes()

  const isOwner = session?.user.id === post.authorId

  return (
    <div className="flex items-center gap-3">

      {/* Views — just displays, incremented automatically on page load */}
      <div className="flex items-center gap-1.5 text-slate-400 text-sm">
        <Eye className="w-4 h-4" />
        <span>{post.views}</span>
      </div>

      {/* Like button */}
      <button
        onClick={() => like({ id: post.id })}
        disabled={isPending}
        className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition disabled:opacity-50"
      >
        <Heart className="w-4 h-4" />
        <span>{post.likes}</span>
      </button>

      {/* Edit button — only visible to post owner */}
      {isOwner && (
        <Link
          href={`/dashboard/post/${post.id}/edit`}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-80 transition"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Link>
      )}
    </div>
  )
}