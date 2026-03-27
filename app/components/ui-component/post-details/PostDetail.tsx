"use client"
import { useEffect } from "react"
import { useGetPost, useIncrementViews } from "@/app/lib/queries/post.queries"
import { PostActions } from "./PostActions"
import { PostFiles } from "./PostFiles"
import { PostLinks } from "./PostLinks"
import PostsError from "../../ui-loading/PostsError"
import { Tag, Globe, Lock } from "lucide-react"
import { PostDetailSkeleton } from "../../ui-loading/PostDetailSkeleton"
export function PostDetail({ id }: { id: string }) {
  const { data: post, isLoading, isError, error, refetch } = useGetPost(id)
  const { mutate: incrementViews } = useIncrementViews()
  // increment views once when page loads
  useEffect(() => {
    incrementViews({ id })
  }, [id])

  if (isLoading) return <PostDetailSkeleton />

  if (isError || !post) {
    return <PostsError message={error?.message} onRetry={refetch} />
  }

  return (
    <div className="space-y-4">

      {/* Header card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">

        {/* Top row — badges + actions */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {post.type && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                post.type === "tutorial"
                  ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                  : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              }`}>
                {post.type}
              </span>
            )}
            <span className={`text-xs px-2.5 py-1 rounded-full ${
              post.isPublic
                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            }`}>
              {post.isPublic
                ? <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Public</span>
                : <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Private</span>
              }
            </span>
          </div>

          {/* Like, views, edit */}
          <PostActions post={post} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          {post.title}
        </h1>

        {/* Description */}
        {post.description && (
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
            {post.description}
          </p>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Date */}
        <p className="text-xs text-slate-400 mt-4">
          Posted {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
          })}
        </p>
      </div>

      {/* Files */}
      <PostFiles files={post.files} />

      {/* Links */}
      <PostLinks links={post.links} />

    </div>
  )
}
