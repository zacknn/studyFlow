"use client";

import Link from "next/link";
import {
  BookOpen,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/dashboard/browse-note", label: "Browse Notes" },
    { href: "/dashboard/chatbot", label: "AI Tutor" },
    { href: "/dashboard/community", label: "Community" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl shadow-sm shadow-slate-200/50 dark:shadow-slate-900/50 border-b border-slate-200 dark:border-slate-800"
          : "bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-rose-500 p-1.5 rounded-lg group-hover:shadow-lg group-hover:shadow-rose-500/25 group-hover:scale-105 transition-all duration-300">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            StudyFlow
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive(link.href)
                  ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-500" />
              )}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all duration-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          {/* Auth */}
          {session ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="relative group">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-9 h-9 rounded-full object-cover border-2 border-rose-500 hover:border-rose-600 transition-all duration-300 cursor-pointer hover:scale-105"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-rose-500 hover:border-rose-600 transition-all duration-300 cursor-pointer hover:scale-105">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 pointer-events-none shadow-lg">
                  {session.user.name}
                </div>
              </div>

              <button
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: { onSuccess: () => router.push("/") },
                  })
                }
                className="p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all duration-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>

              <Link href="/dashboard">
                <button className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-slate-100/20 hover:-translate-y-0.5 active:scale-95">
                  Dashboard
                </button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-4 py-2"
              >
                Sign in
              </Link>
              <Link href="/signup">
                <button className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-slate-100/20 hover:-translate-y-0.5 active:scale-95">
                  Get Started
                </button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
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
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          menuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-1 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 space-y-2">
            {session ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold text-xs">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {session.user.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    authClient.signOut({
                      fetchOptions: { onSuccess: () => router.push("/") },
                    });
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Sign out
                </button>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-sm font-medium px-4 py-3 rounded-xl transition-all hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.98]">
                    Dashboard
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Sign in
                </Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)}>
                  <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-sm font-medium px-4 py-3 rounded-xl transition-all hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.98]">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}