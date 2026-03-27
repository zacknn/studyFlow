"use client";
import { Heart, Eye, Pencil, Trash2 } from "lucide-react";
import {
  useIncrementLikes,
  useDeletePost,
} from "@/app/lib/queries/post.queries";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import type { Post } from "@/app/schemas/posts.schemas";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export function PostActions({ post }: { post: Post }) {
  const { data: session } = authClient.useSession();
  const { mutate: like, isPending: likeIsPending } = useIncrementLikes();
  const { mutate: deletePost, isPending: deleteIsPending } = useDeletePost();
  const router = useRouter();
  const isOwner = session?.user.id === post.authorId;

  function handleDelete() {
    deletePost(
      { id: post.id },
      { onSuccess: () => router.push("/dashboard/browse-note") }
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Views — just displays, incremented automatically on page load */}
      <div className="flex items-center gap-1.5 text-slate-400 text-sm">
        <Eye className="w-4 h-4" />
        <span>{post.views}</span>
      </div>

      {/* Like button */}
      <button
        onClick={() => like({ id: post.id })}
        disabled={likeIsPending}
        className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition disabled:opacity-50"
      >
        <Heart className="w-4 h-4" />
        <span>{post.likes}</span>
      </button>

      {/* Edit button — only visible to post owner */}
      {isOwner && (
        <Link
          href={`/dashboard/post/${post.id}/edit`}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-80 transition"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Link>
      )}

      {/* Delete button — only visible to post owner */}
      {isOwner && (
        <Button
          onClick={handleDelete}
          disabled={deleteIsPending}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          {deleteIsPending ? "Deleting…" : "Delete"}
        </Button>
      )}
    </div>
  );
}
