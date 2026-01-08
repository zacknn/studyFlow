import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AuthCTA() {
  return (
    <div className="max-w-md mx-auto text-center">
      <h2 className="text-3xl font-semibold tracking-tight mb-4 text-slate-900 dark:text-white">Ready to accelerate your learning?</h2>
      <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">Join thousands of students using AI to master their subjects.</p>
      
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl shadow-slate-200 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-800 transition-colors">
        <form className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email address</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:focus:ring-rose-500/20 outline-none transition-all" placeholder="you@university.edu" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:focus:ring-rose-500/20 outline-none transition-all" placeholder="••••••••" />
          </div>
          <button type="button" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-medium py-3.5 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transform active:scale-[0.98] transition-all flex justify-center items-center gap-2">
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400 dark:text-slate-500 text-center">
          Already have an account? <Link href="#" className="text-rose-600 dark:text-rose-400 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}