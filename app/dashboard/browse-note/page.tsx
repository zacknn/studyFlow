"use client"
import SearchBar from "@/app/components/ui-component/SearchBar"
import Filters from "@/app/components/ui-component/Fillters"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import PostsGrid from "@/app/components/ui-component/PostsGrid"
import PostsLoading from "@/app/components/ui-loading/PostLoading"
export default function BrowseNotesPage() {

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

      {/* button for adding new notes */}
      <Button className="mb-8">Add Note</Button>
      {/* Post Grid */}
      <Suspense fallback={<PostsLoading />}>
        <PostsGrid />
      </Suspense>
    </div>
  )
}
