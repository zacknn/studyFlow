'use client'  

import { useListPosts } from '@/app/lib/queries/post.queries'
import Card from './Card'
import PostsError from '../ui-loading/PostsError'

export default function PostsGrid() {
  const { data, isError, error, refetch } = useListPosts({ isPublic: true })

  if (isError) return <PostsError message={error?.message} onRetry={refetch} />

  return (
    <div>
    {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.length === 0 ? (
            <p className="col-span-3 text-center text-slate-500 py-16">
              No posts found.
            </p>
          ) : (
            data.data.map((post) => (
              <Card key={post.id} post={post} />
            ))
          )}
        </div>
      )}
      </div>
  )
}
