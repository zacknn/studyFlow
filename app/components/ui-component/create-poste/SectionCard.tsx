export function SectionCard({ title, icon, children }: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
        {icon}
        <h2 className="text-sm font-semibold uppercase tracking-widest">{title}</h2>
      </div>
      {children}
    </div>
  )
}