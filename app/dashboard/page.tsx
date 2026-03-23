import { auth } from "@/app/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/app/lib/prisma"
import Link from "next/link"
import { BookOpen, Plus, Bot, Eye, Heart } from "lucide-react"

export default async function DashboardPage() {
  // server side auth check
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/login")

  // fetch user's recent posts
  const recentPosts = await prisma.post.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 4,
    include: { files: true, links: true }
  })

  const totalPosts = await prisma.post.count({
    where: { authorId: session.user.id }
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Welcome header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome back, {session.user.name?.split(" ")[0]} 
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Here's what's happening with your study materials.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Total Posts</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalPosts}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Total Views</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {recentPosts.reduce((sum, p) => sum + p.views, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Total Likes</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {recentPosts.reduce((sum, p) => sum + p.likes, 0)}
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <Link href="/dashboard/create-post">
          <div className="flex items-center gap-4 bg-rose-500 hover:bg-rose-600 rounded-2xl p-5 transition cursor-pointer group">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">Create Post</p>
              <p className="text-rose-100 text-sm">Share your notes or tutorials</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/ai-tutor">
          <div className="flex items-center gap-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-2xl p-5 transition cursor-pointer">
            <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <p className="font-semibold text-white">AI Tutor</p>
              <p className="text-slate-400 text-sm">Ask anything, analyze documents</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Your Recent Posts
          </h2>
          <Link
            href="/dashboard/browse-note"
            className="text-sm text-rose-500 hover:text-rose-600 transition"
          >
            Browse all →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No posts yet</p>
            <Link
              href="/dashboard/create-post"
              className="text-rose-500 text-sm hover:text-rose-600 transition mt-1 inline-block"
            >
              Create your first post →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentPosts.map(post => (
              <Link key={post.id} href={`/dashboard/post/${post.id}`}>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 rounded-2xl p-5 transition group">
                  <div className="flex items-start justify-between mb-2">
                    {post.type && (
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        post.type === "tutorial"
                          ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}>
                        {post.type}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${
                      post.isPublic
                        ? "text-green-600 dark:text-green-400"
                        : "text-slate-400"
                    }`}>
                      {post.isPublic ? "Public" : "Private"}
                    </span>
                  </div>

                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-rose-500 transition line-clamp-1 mb-1">
                    {post.title}
                  </h3>

                  {post.description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                      {post.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {post.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" /> {post.likes}
                    </span>
                    <span className="ml-auto">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric"
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
