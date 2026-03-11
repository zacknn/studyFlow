import Link from "next/link"
import { Eye, Heart, FileText, Link as LinkIcon, Tag } from "lucide-react"
import type { Post } from "@/app/schemas/posts.schemas"

interface CardProps {
  post: Post
  onClick?: (id: string) => void
}

export default function Card({ post, onClick }: CardProps) {
  return (
    <Link
      href={`/dashboard/post/${post.id}`}
      onClick={() => onClick?.(post.id)}
      className="group block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="p-5 flex flex-col gap-3">

        {/* Top row — type badge + visibility */}
        <div className="flex items-center justify-between">
          {post.type ? (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              post.type === "tutorial"
                ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            }`}>
              {post.type}
            </span>
          ) : (
            <span /> // empty to keep justify-between working
          )}

          <span className={`text-xs px-2 py-1 rounded-full ${
            post.isPublic
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          }`}>
            {post.isPublic ? "Public" : "Private"}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Description */}
        {post.description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
            {post.description}
          </p>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-slate-400 px-2 py-0.5">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-800" />

        {/* Bottom row — stats */}
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              {post.likes}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {post.files.length > 0 && (
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                {post.files.length}
              </span>
            )}
            {post.links.length > 0 && (
              <span className="flex items-center gap-1">
                <LinkIcon className="w-3.5 h-3.5" />
                {post.links.length}
              </span>
            )}
            <span className="text-slate-300 dark:text-slate-600">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

      </div>
    </Link>
  )
}
