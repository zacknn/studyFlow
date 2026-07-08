export default function ChatbotLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto mb-10 flex flex-col items-center gap-3">
        <div className="h-10 w-72 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
        <div className="h-4 w-96 max-w-full rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>

      <div className="flex h-[calc(100vh-20rem)] gap-6">
        <div className="w-72 shrink-0 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
          <div className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 rounded-xl bg-slate-50 dark:bg-slate-800/50 animate-pulse" />
          ))}
        </div>
        <div className="flex-1 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 animate-pulse" />
      </div>
    </div>
  )
}