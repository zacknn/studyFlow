import { ExternalLink } from "lucide-react"
import type { Post } from "@/app/schemas/posts.schemas"

export function PostLinks({ links }: { links: Post["links"] }) {
  if (links.length === 0) return null

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
        Links ({links.length})
      </h2>
      <div className="space-y-2">
        {links.map(link => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl px-4 py-3 group transition"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {link.label ?? link.url}
                </p>
                {link.label && (
                  <p className="text-xs text-slate-400 truncate max-w-[250px]">
                    {link.url}
                  </p>
                )}
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition" />
          </a>
        ))}
      </div>
    </div>
  )
}