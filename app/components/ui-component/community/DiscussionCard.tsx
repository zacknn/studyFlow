import { motion } from "framer-motion"
import Link from "next/link"
import { MessageSquare, Tag, Clock } from "lucide-react"
import { AuthorBadge } from "@/app/components/ui-component/AuthorBadge"
import type { DiscussionSummary } from "@/app/schemas/discussion.schemas"

export function DiscussionCard({
  discussion,
  index,
}: {
  discussion: DiscussionSummary
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/dashboard/community/${discussion.id}`}>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 rounded-2xl p-5 transition group cursor-pointer">

          {/* Author + time */}
          <div className="flex items-center justify-between mb-3">
            <AuthorBadge author={discussion.author} />
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              {new Date(discussion.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Title */}
          <h2 className="font-semibold text-slate-900 dark:text-white group-hover:text-rose-500 dark:group-hover:text-rose-400 transition text-base mb-2 line-clamp-2">
            {discussion.title}
          </h2>

          {/* Content preview */}
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
            {discussion.content}
          </p>

          {/* Tags */}
          {discussion.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {discussion.tags.slice(0, 4).map(tag => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <MessageSquare className="w-3.5 h-3.5" />
              {discussion.commentCount} comment{discussion.commentCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}