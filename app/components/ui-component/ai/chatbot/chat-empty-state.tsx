"use client"

import { Sparkles, BookOpen, Code2, Brain } from "lucide-react"

const SUGGESTIONS = [
  {
    icon: BookOpen,
    label: "Quiz me on a topic",
    prompt: "Quiz me with 5 questions on normalization in relational databases.",
  },
  {
    icon: Code2,
    label: "Debug an approach",
    prompt: "I'm getting unexpected output from a recursive function — how should I approach debugging it?",
  },
  {
    icon: Brain,
    label: "Explain simply",
    prompt: "Explain Big-O time complexity using a real-life analogy.",
  },
]

export function ChatEmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-500/20">
        <Sparkles className="h-6 w-6" />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          What are you studying today?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Ask a question, paste a problem, or pick a starting point below.
        </p>
      </div>
      <div className="grid w-full max-w-md gap-3 sm:grid-cols-3">
        {SUGGESTIONS.map(({ icon: Icon, label, prompt }) => (
          <button
            key={label}
            onClick={() => onPick(prompt)}
            className="flex flex-col items-start gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-left text-xs transition-all hover:border-rose-200 dark:hover:border-rose-500/30 hover:shadow-md hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-500/10">
              <Icon className="h-3.5 w-3.5 text-rose-500" />
            </div>
            <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
