import { FileSchema } from "@/app/schemas/posts.schemas"
import type { z } from "zod"
import { FileText } from "lucide-react"
import { formatSize } from "@/app/lib/format_size"


type File = z.infer<typeof FileSchema>

export function ExistingFiles({ files }: { files: File[] }) {
  if (files.length === 0) return null

  return (
    <div className="space-y-2 mb-4">
      <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">Existing Files</h4>
      {files.map((file) => (
        <div key={file.id} className="flex items-center gap-3 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <FileText className="w-4 h-4 text-slate-500" />
          <div className="flex-1">
            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {file.name}
            </a>
            <div className="text-xs text-slate-500 dark:text-slate-400">{formatSize(file.size)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}