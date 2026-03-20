export function PostDetailSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
        </div>
        <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded" />
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-32" />
    </div>
  )
}