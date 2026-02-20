"use client";

import Link from "next/link";
import { BookOpen, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-rose-500 p-1.5 rounded-lg">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            StudyFlow
          </span>
        </div>

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

        <div className="flex items-center gap-4">
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
          <Link href={"/login"}>
            <button className="hidden sm:block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Sign in
            </button>
          </Link>
          <Link href={'/signup'}>
            <button className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 text-sm font-medium px-4 py-2 rounded-full transition-all">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
