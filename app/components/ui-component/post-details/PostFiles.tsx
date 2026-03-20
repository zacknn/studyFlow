import { FileText, Download } from "lucide-react"
import type { Post } from "@/app/schemas/posts.schemas"

export function PostFiles({ files }: { files: Post["files"] }) {
  if (files.length === 0) return null

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
        Files ({files.length})
      </h2>
      <div className="space-y-2">
        {files.map(file => (
          <a
            key={file.id}
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl px-4 py-3 group transition"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[250px]">
                  {file.name}
                </p>
                <p className="text-xs text-slate-400">
                  {(file.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition" />
          </a>
        ))}
      </div>
    </div>
  )
}