"use client"

import { useState } from "react"
import { ArrowLeft, Loader2, Plus, Tag, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useUpdateDiscussion } from "@/app/lib/queries/discussion.queries"

interface EditDiscussionFormProps {
  discussionId: string
  initialTitle: string
  initialContent: string
  initialTags: string[]
}

export function EditDiscussionForm({
  discussionId,
  initialTitle,
  initialContent,
  initialTags,
}: EditDiscussionFormProps) {
  const router = useRouter()
  const { mutate: updateDiscussion, isPending } = useUpdateDiscussion()
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [tags, setTags] = useState(initialTags)
  const [tagInput, setTagInput] = useState("")

  function addTag() {
    const trimmed = tagInput.trim().toLowerCase()
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      setTags([...tags, trimmed])
      setTagInput("")
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim() || !content.trim() || isPending) return

    updateDiscussion(
      { id: discussionId, title: title.trim(), content: content.trim(), tags },
      { onSuccess: () => router.push(`/dashboard/community/${discussionId}`) }
    )
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <button
        type="button"
        onClick={() => router.push(`/dashboard/community/${discussionId}`)}
        className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-700 dark:hover:text-slate-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Discussion
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Discussion</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update your question or add more context for the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="discussion-title" className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Title <span className="text-rose-400">*</span>
            </label>
            <input
              id="discussion-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              maxLength={300}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-rose-400 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label htmlFor="discussion-content" className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Details <span className="text-rose-400">*</span>
            </label>
            <textarea
              id="discussion-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
              maxLength={10000}
              rows={8}
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-rose-400 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label htmlFor="discussion-tag" className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Tags
            </label>
            <div className="mb-2 flex gap-2">
              <input
                id="discussion-tag"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    addTag()
                  }
                }}
                placeholder="Add a tag..."
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-rose-400 dark:border-slate-700 dark:bg-slate-800"
              />
              <button
                type="button"
                onClick={addTag}
                aria-label="Add tag"
                className="rounded-xl bg-slate-900 px-3 py-2.5 text-white transition hover:opacity-80 dark:bg-white dark:text-slate-900"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs text-rose-600 dark:bg-rose-900/20 dark:text-rose-400">
                    <Tag className="h-3 w-3" />
                    {tag}
                    <button type="button" onClick={() => setTags(tags.filter((item) => item !== tag))} aria-label={`Remove ${tag}`}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push(`/dashboard/community/${discussionId}`)}
              disabled={isPending}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !title.trim() || !content.trim()}
              className="flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
