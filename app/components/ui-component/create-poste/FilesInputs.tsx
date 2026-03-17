import { useRef } from "react";
import { FileEntry } from "@/app/types";
import { Upload , FileText , X } from "lucide-react";

export function FilesInput({ files, onChange }: { files: FileEntry[]; onChange: (files: FileEntry[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? [])
    const newEntries: FileEntry[] = selected.map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: formatSize(file.size),
    }))
    onChange([...files, ...newEntries])
    e.target.value = ""
  }

  function removeFile(id: string) {
    onChange(files.filter(f => f.id !== id))
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center cursor-pointer hover:border-rose-400 dark:hover:border-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition group"
      >
        <Upload className="w-6 h-6 text-slate-400 group-hover:text-rose-400 mx-auto mb-2 transition" />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Click to upload files
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          PDF, images, documents — any format
        </p>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={handleFiles} />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map(f => (
            <div key={f.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                    {f.name}
                  </p>
                  <p className="text-xs text-slate-400">{f.size}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(f.id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}