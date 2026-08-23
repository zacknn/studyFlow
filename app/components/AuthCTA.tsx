import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AuthCTA() {
  return (
    <div className="relative animate-fade-in-up" style={{ opacity: 0 }}>
      <div className="max-w-lg mx-auto text-center relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-rose-500/[0.04] dark:bg-rose-500/[0.06] rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-2 mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Ready to accelerate your learning?
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Join thousands of students using AI to master their subjects.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-2xl shadow-slate-200/60 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-800 transition-all hover:shadow-3xl hover:shadow-slate-200/80 dark:hover:shadow-slate-950/60 hover:-translate-y-1 duration-500">
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mb-8 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              No credit card
            </span>
          </div>

          <form className="space-y-4 text-left">
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:focus:ring-rose-500/20 outline-none transition-all duration-300 placeholder:text-slate-400"
                placeholder="you@university.edu"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:focus:ring-rose-500/20 outline-none transition-all duration-300 placeholder:text-slate-400"
                placeholder="••••••••"
              />
            </div>
            <button
              type="button"
              className="group w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-medium py-3.5 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-none mt-2"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>
          <p className="mt-6 text-sm text-slate-400 dark:text-slate-500 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}