import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-rose-500 p-1.5 rounded-lg group-hover:shadow-lg group-hover:shadow-rose-500/20 transition-all duration-300">
              <BookOpen className="text-white w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">
              StudyFlow
            </span>
          </Link>

          <div className="flex gap-8 text-sm">
            {["Privacy", "Terms", "Twitter"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-rose-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="text-sm text-slate-400 dark:text-slate-600">
            © {new Date().getFullYear()} StudyFlow Inc.
          </div>
        </div>
      </div>
    </footer>
  );
}