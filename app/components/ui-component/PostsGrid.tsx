"use client";

import { useSearchParams } from "next/navigation";
import { useListPosts } from "@/app/lib/queries/post.queries";
import Card from "./Card";
import PostsError from "../ui-loading/PostsError";
import PostsLoading from "../ui-loading/PostLoading";
import PaginationControls from "./PaginationControls";
import { authClient } from "@/app/lib/auth-client";

export default function PostsGrid() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const q = searchParams.get("q") || undefined;
  const tag = searchParams.get("tag") || undefined;

  const { data, isError, error, refetch, isLoading } = useListPosts({
    isPublic: true,
    search: q,
    tag: tag,
    page: currentPage,
    limit: 12,
  });

  const { data: session } = authClient.useSession();
  const author = session?.user
    ? { name: session.user.name, image: session.user.image }
    : undefined;
  if (isError) {
    return <PostsError message={error?.message} onRetry={refetch} />;
  }

  const posts = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div>
      {isLoading ? (
        <PostsLoading />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length === 0 ? (
              <p className="col-span-3 text-center text-slate-500 py-16">
                No posts found matching your search.
              </p>
            ) : (
              posts.map((post) => (
                <Card key={post.id} post={post} author={author} />
              ))
            )}
          </div>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
