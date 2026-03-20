import { Suspense } from "react"
import { PostDetail } from "@/app/components/ui-component/post-details/PostDetail"
import { PostDetailSkeleton } from "@/app/components/ui-loading/PostDetailSkeleton"


export default async function PostPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params  

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Suspense fallback={<PostDetailSkeleton />}>
          <PostDetail id={id} />
        </Suspense>
      </div>
    </div>
  )
}