"use client";

import Image from "next/image";
import { Eye, Heart, FileText } from "lucide-react";
import Card from "../ui-component/Card";
import type { Post } from "@/app/schemas/posts.schemas";

interface ProfileContentProps {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  posts: Post[];
  stats: {
    totalPosts: number;
    totalViews: number;
    totalLikes: number;
  };
}

export function ProfileContent({ user, posts, stats }: ProfileContentProps) {
  return (
    <div className="space-y-8">
      {/* Profile Header Card */}
      <div className="bg-linear-to-r from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div>
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "User"}
                width={120}
                height={120}
                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-700"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-rose-400 to-pink-500 flex items-center justify-center border-4 border-white dark:border-slate-700">
                <span className="text-white font-bold text-3xl">
                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                </span>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              {user.name ?? "Anonymous User"}
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Posts */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                    Posts
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.totalPosts}
                </p>
              </div>

              {/* Views */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                    Views
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.totalViews.toLocaleString()}
                </p>
              </div>

              {/* Likes */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                    Likes
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stats.totalLikes.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          {posts.length === 0 ? "No Posts Yet" : `Posts (${posts.length})`}
        </h2>

        {posts.length === 0 ? (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">
              This user hasn't created any posts yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
