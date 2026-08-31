import { auth } from "@/app/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/app/lib/prisma"
import Link from "next/link"
import {
  BookOpen,
  Plus,
  Bot,
  Eye,
  Heart,
  FileText,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/login")

  const recentPosts = await prisma.post.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 4,
    include: { files: true, links: true },
  })

  const totalPosts = await prisma.post.count({
    where: { authorId: session.user.id },
  })

  const totalViews = recentPosts.reduce((sum, p) => sum + (p.views || 0), 0)
  const totalLikes = recentPosts.reduce((sum, p) => sum + (p.likes || 0), 0)

  const firstName = session.user.name?.split(" ")[0] || "there"

  return (
    <>
      {/* Embedded keyframes — keeps this a Server Component */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 0.7; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-subtle-pulse {
          animation: subtlePulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-14 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-rose-500/[0.04] dark:bg-rose-500/[0.06] rounded-full blur-3xl pointer-events-none animate-subtle-pulse" />
        <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-slate-500/[0.03] dark:bg-slate-500/[0.05] rounded-full blur-3xl pointer-events-none" />

        {/* ─── Welcome Header ─── */}
        <div
          className="relative mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-medium border border-rose-100 dark:border-rose-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Welcome back,{" "}
            <span className="text-rose-500">{firstName}</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
            Here&apos;s what&apos;s happening with your study materials.
          </p>
        </div>

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            {
              label: "Total Posts",
              value: totalPosts,
              icon: FileText,
              color: "text-rose-500",
              bg: "bg-rose-50 dark:bg-rose-500/10",
            },
            {
              label: "Total Views",
              value: totalViews,
              icon: TrendingUp,
              color: "text-emerald-500",
              bg: "bg-emerald-50 dark:bg-emerald-500/10",
            },
            {
              label: "Total Likes",
              value: totalLikes,
              icon: Heart,
              color: "text-pink-500",
              bg: "bg-pink-50 dark:bg-pink-500/10",
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-slate-900/40 hover:-translate-y-1 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* ─── Quick Actions ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          <Link href="/dashboard/create-post">
            <div
              className="group relative overflow-hidden flex items-center gap-5 bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 rounded-2xl p-6 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-1 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              <div className="relative w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="relative">
                <p className="font-semibold text-white text-lg">
                  Create Post
                </p>
                <p className="text-rose-100 text-sm mt-0.5">
                  Share your notes or tutorials
                </p>
              </div>
              <ArrowRight className="absolute right-6 w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </Link>

          <Link href="/dashboard/ai-tutor">
            <div
              className="group relative overflow-hidden flex items-center gap-5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-2xl p-6 transition-all duration-500 hover:shadow-xl hover:shadow-slate-900/30 dark:hover:shadow-slate-950/50 hover:-translate-y-1 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: "0.45s" }}
            >
              <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Bot className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <p className="font-semibold text-white text-lg">AI Tutor</p>
                <p className="text-slate-400 text-sm mt-0.5">
                  Ask anything, analyze documents
                </p>
              </div>
              <ArrowRight className="absolute right-6 w-5 h-5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </Link>
        </div>

        {/* ─── Recent Posts ─── */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.55s" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Your Recent Posts
            </h2>
            <Link
              href="/dashboard/browse-note"
              className="group inline-flex items-center gap-1 text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
            >
              Browse all
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div className="relative text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/30 animate-fade-in-up">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-slate-500 font-medium">No posts yet</p>
              <Link
                href="/dashboard/create-post"
                className="inline-flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600 font-medium mt-2 transition-colors"
              >
                Create your first post
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {recentPosts.map((post, i) => (
                <Link key={post.id} href={`/dashboard/post/${post.id}`}>
                  <div
                    className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-rose-200 dark:hover:border-rose-800 hover:shadow-lg hover:shadow-slate-200/30 dark:hover:shadow-slate-900/30 hover:-translate-y-1 transition-all duration-500 animate-fade-in-up"
                    style={{ animationDelay: `${0.6 + i * 0.08}s` }}
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-3">
                      {post.type ? (
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            post.type === "tutorial"
                              ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                              : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                          }`}
                        >
                          {post.type}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          post.isPublic
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {post.isPublic ? "Public" : "Private"}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-300 line-clamp-1 text-lg mb-1">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {post.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center gap-5 text-xs text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        {post.views || 0}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5" />
                        {post.likes || 0}
                      </span>
                      <span className="ml-auto font-medium">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
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
    </>
  )
}