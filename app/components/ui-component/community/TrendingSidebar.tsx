"use client"
import { useListDiscussions } from "@/app/lib/queries/discussion.queries"
import { TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface TrendingSidebarProps {
  activeTag: string | null
  onTagClick: (tag: string) => void
}

export function TrendingSidebar({ activeTag, onTagClick }: TrendingSidebarProps) {
  const { data } = useListDiscussions({ limit: 50 })

  // count tag occurrences across all discussions
  const tagCounts = data?.data.reduce((acc, discussion) => {
    discussion.tags.forEach(tag => {
      acc[tag] = (acc[tag] ?? 0) + 1
    })
    return acc
  }, {} as Record<string, number>) ?? {}

  const sortedTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)

  return (
    <div className="sticky top-24 space-y-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-rose-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
            Trending Topics
          </h3>
        </div>

        {sortedTags.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">
            No tags yet
          </p>
        ) : (
          <div className="space-y-1">
            {sortedTags.map(([tag, count], i) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => onTagClick(tag)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition ${
                  activeTag === tag
                    ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                <span>#{tag}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  activeTag === tag
                    ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}>
                  {count}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}