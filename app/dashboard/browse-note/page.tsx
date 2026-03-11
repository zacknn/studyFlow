// app/dashboard/browse-note/page.tsx
"use client"
import React from "react"
import SearchBar from "@/app/components/ui-component/SearchBar"
import Filters from "@/app/components/ui-component/Fillters"
import Card from "@/app/components/ui-component/Card"
import PostsLoading from "@/app/components/ui-loading/PostLoading"
import PostsError from "@/app/components/ui-loading/PostsError"
import { useListPosts } from "@/app/lib/queries/post.queries"

export default function BrowseNotesPage() {
  const { data, isLoading, isError, error, refetch } = useListPosts({ isPublic: true })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Browse Notes
        </h1>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex-1">
            <SearchBar />
          </div>
          <Filters
            categories={["Math", "Science", "History", "Literature"]}
            className="md:ml-4"
          />
        </div>
      </div>

      {/* Results count */}
      {data && (
        <div className="mb-8 text-center text-gray-600 dark:text-gray-400">
          <p>Showing {data.data.length} of {data.total} posts</p>
        </div>
      )}

      {/* States */}
      {isLoading && <PostsLoading />}

      {isError && (
        <PostsError
          message={error?.message}
          onRetry={() => refetch()}
        />
      )}

      {/* Cards Grid */}
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
