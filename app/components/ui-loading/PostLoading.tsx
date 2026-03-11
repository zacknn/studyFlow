export default function PostsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 animate-pulse">
          <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded" />
          <div className="h-3 w-4/5 bg-slate-100 dark:bg-slate-800 rounded" />
          <div className="flex gap-2 pt-2">
            <div className="h-5 w-14 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-5 w-14 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}