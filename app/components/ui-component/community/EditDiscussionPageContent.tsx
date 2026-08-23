"use client"

import { useGetDiscussion } from "@/app/lib/queries/discussion.queries"
import { EditDiscussionForm } from "./EditDiscussionForm"

export function EditDiscussionPageContent({ discussionId }: { discussionId: string }) {
  const { data: discussion, isLoading, isError } = useGetDiscussion(discussionId)

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-3xl space-y-4 px-4 py-6 sm:px-6 sm:py-10">
        <div className="h-4 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-96 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
      </main>
    )
  }

  if (isError || !discussion) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10 text-center sm:px-6">
        <p className="text-slate-500 dark:text-slate-400">Discussion not found</p>
      </main>
    )
  }

  return (
    <EditDiscussionForm
      key={discussion.id}
      discussionId={discussion.id}
      initialTitle={discussion.title}
      initialContent={discussion.content}
      initialTags={discussion.tags}
    />
  )
}
