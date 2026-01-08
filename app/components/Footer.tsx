import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-rose-500 p-1 rounded-md">
            <BookOpen className="text-white w-4 h-4" />
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">StudyFlow</span>
        </div>
        <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
          <Link href="#" className="hover:text-slate-900 dark:hover:text-white">Privacy</Link>
          <Link href="#" className="hover:text-slate-900 dark:hover:text-white">Terms</Link>
          <Link href="#" className="hover:text-slate-900 dark:hover:text-white">Twitter</Link>
        </div>
        <div className="text-sm text-slate-400 dark:text-slate-600">
          © 2024 StudyFlow Inc.
        </div>
      </div>
    </footer>
  );
}