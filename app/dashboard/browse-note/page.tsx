import SearchBar from "@/app/components/ui-component/SearchBar";
import Filters from "@/app/components/ui-component/Fillters";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import PostsGrid from "@/app/components/ui-component/PostsGrid";
import PostsLoading from "@/app/components/ui-loading/PostLoading";
import Link from "next/link";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export default async function BrowseNotesPage() {
  const session = await auth.api.getSession({ headers: await headers() })
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
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>
          <Suspense>
            {/* i think i got too far , for now i it will stay like that  */}
            <Filters
              tags={["math", "science", "history", "literature", "art", "technology", "ai" , "programming",
                 "language", "philosophy", "psychology", "health", "fitness", "finance", "business", "marketing", "design", 
                 "music", "travel", "food", "sports", "machine learning", "data science", "web development", "mobile development", 
                 "cloud computing", "cybersecurity", "blockchain", "cryptocurrency", "personal development", "productivity", 
                 "mental health", "relationships", "parenting", "education", "career", "entrepreneurship", "self-improvement"]}
              className="md:ml-4"
            />
          </Suspense>
        </div>
      </div>

      {/* button for adding new notes - only show if authenticated */}
      {session?.user && (
        <Link href={"/dashboard/create-post"}>
          <Button className="mb-8">Add Note</Button>
        </Link>
      )}

      {/* Post Grid */}
      <Suspense fallback={<PostsLoading />}>
        <PostsGrid />
      </Suspense>
    </div>
  );
}
