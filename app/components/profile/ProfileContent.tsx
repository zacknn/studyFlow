"use client";

import Image from "next/image";
import { Eye, Heart, FileText, MapPin, Calendar } from "lucide-react";
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
  const firstName = user.name?.split(" ")[0] ?? "User";

  return (
    <>
      {/* Embedded keyframes for entrance animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>

      <div className="space-y-10">
        {/* ─── Profile Header Card ─── */}
        <div
          className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm animate-fade-in-up"
          style={{ animationDelay: "0.05s" }}
        >
          {/* Top gradient strip */}
          <div className="h-32 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500" />

          <div className="px-6 md:px-10 pb-8 -mt-12">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Avatar */}
              <div className="relative animate-scale-in" style={{ animationDelay: "0.15s" }}>
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl bg-white dark:bg-slate-800">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name ?? "User"}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                      <span className="text-white font-bold text-3xl">
                        {user.name?.charAt(0).toUpperCase() ?? "U"}
                      </span>
                    </div>
                  )}
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full" />
              </div>

              {/* User Info */}
              <div className="flex-1 pt-2 md:pb-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {user.name ?? "Anonymous User"}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    StudyFlow Member
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Joined recently
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {[
                {
                  label: "Posts",
                  value: stats.totalPosts,
                  icon: FileText,
                  color: "text-rose-500",
                  bg: "bg-rose-50 dark:bg-rose-500/10",
                  border: "border-rose-100 dark:border-rose-500/20",
                },
                {
                  label: "Views",
                  value: stats.totalViews.toLocaleString(),
                  icon: Eye,
                  color: "text-blue-500",
                  bg: "bg-blue-50 dark:bg-blue-500/10",
                  border: "border-blue-100 dark:border-blue-500/20",
                },
                {
                  label: "Likes",
                  value: stats.totalLikes.toLocaleString(),
                  icon: Heart,
                  color: "text-pink-500",
                  bg: "bg-pink-50 dark:bg-pink-500/10",
                  border: "border-pink-100 dark:border-pink-500/20",
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`group relative flex flex-col items-center md:items-start gap-2 rounded-2xl border ${stat.border} ${stat.bg} p-4 md:p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-500`}
                  style={{ animationDelay: `${0.35 + i * 0.08}s` }}
                >
                  <div
                    className={`w-9 h-9 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Posts Section ─── */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {posts.length === 0 ? "No Posts Yet" : "Recent Posts"}
              </h2>
              {posts.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium">
                  {posts.length}
                </span>
              )}
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="relative text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/30 animate-fade-in-up">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-slate-500 font-medium text-lg">
                No posts yet
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
                {firstName} hasn&apos;t shared any study materials.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <div
                  key={post.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${0.55 + i * 0.08}s` }}
                >
                  <Card post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}