"use client"
import { useParams, useRouter } from "next/navigation"
import { useGetPost, useUpdatePost } from "@/app/lib/queries/post.queries"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { data: post, isLoading } = useGetPost(id)
  const { mutate: updatePost, isPending } = useUpdatePost()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // pre-fill form when post loads
  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setDescription(post.description ?? "")
    }
  }, [post])

  if (isLoading) return <div className="p-10 text-center">Loading...</div>

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    updatePost(
      { id, title, description: description || undefined },
      { onSuccess: () => router.push(`/dashboard/post/${id}`) }
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
          Edit Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-400"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-400 resize-none"
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition"
          >
            {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}