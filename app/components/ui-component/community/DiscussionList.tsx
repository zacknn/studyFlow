"use client"
import { useListDiscussions } from "@/app/lib/queries/discussion.queries"
import { DiscussionCard } from "./DiscussionCard"
import { Loader2, MessageSquare } from "lucide-react"
import { useDebounce } from "@/app/lib/hooks/useDebounce"

interface DiscussionListProps {
  tag?: string
  search?: string
}

export function DiscussionList({ tag, search }: DiscussionListProps) {
  const debouncedSearch = useDebounce(search, 300)

  const { data, isLoading, isError, refetch } = useListDiscussions({
    tag,
    search: debouncedSearch,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 animate-pulse"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded mb-1" />
            <div className="h-3 w-2/3 bg-slate-100 dark:bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 text-sm mb-3">Failed to load discussions</p>
        <button
          onClick={() => refetch()}
          className="text-rose-500 text-sm hover:text-rose-600 transition"
        >
          Try again
        </button>
      </div>
    )
  }

  if (!data?.data.length) {
    return (
      <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
        <MessageSquare className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
        <p className="text-slate-500 text-sm">
          {search || tag
            ? "No discussions found"
            : "No discussions yet — be the first!"
          }
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {data.data.map((discussion, i) => (
        <DiscussionCard
          key={discussion.id}
          discussion={discussion}
          index={i}
        />
      ))}
    </div>
  )
}