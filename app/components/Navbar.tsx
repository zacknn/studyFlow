"use client";
import Link from "next/link";
import { BookOpen, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-rose-500 p-1.5 rounded-lg">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            StudyFlow
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <Link
            href="/dashboard/browse-note"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Browse Notes
          </Link>
          <Link
            href="#"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            AI Tutor
          </Link>
          <Link
            href="#"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Community
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mounted && theme === "dark" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* Auth buttons — changes based on session */}
          {session ? (
            // logged in
            <>
              {/* Avatar */}
              <div className="flex items-center gap-3">
                <div className="relative group">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-9 h-9 rounded-full object-cover border-2 border-rose-500 hover:border-rose-600 transition-colors cursor-pointer"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-rose-500 hover:border-rose-600 transition-colors cursor-pointer">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  {/* Tooltip */}
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {session.user.name}
                  </div>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {session.user.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: { onSuccess: () => router.push("/") },
                  })
                }
                className="hidden sm:block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Sign out
              </button>
              <Link href="/dashboard">
                <button className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 text-sm font-medium px-4 py-2 rounded-full transition-all">
                  Dashboard
                </button>
              </Link>
            </>
          ) : (
            // logged out
            <>
              <Link href="/login">
                <button className="hidden sm:block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Sign in
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 text-sm font-medium px-4 py-2 rounded-full transition-all">
                  Get Started
                </button>
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <Link
            href="/dashboard/browse-note"
            onClick={() => setMenuOpen(false)}
          >
            Browse Notes
          </Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>
            AI Tutor
          </Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>
            Community
          </Link>
          {session ? (
            <>
              <span className="text-sm text-slate-500">
                {session.user.name}
              </span>
              <button onClick={() => authClient.signOut()}>Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)}>
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
