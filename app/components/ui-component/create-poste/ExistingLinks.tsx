import { LinkSchema } from "@/app/schemas/posts.schemas"
import type { z } from "zod"

type Link = z.infer<typeof LinkSchema>

export function ExistingLinks({ links }: { links: Link[] }) {
  if (links.length === 0) return null

  return (
    <div className="space-y-2 mb-4">
      <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">Existing Links</h4>
      {links.map((link) => (
        <div key={link.id} className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <div className="flex-1">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {link.url}
            </a>
            {link.label && <div className="text-xs text-slate-500 dark:text-slate-400">{link.label}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}