// app/components/ui-component/create-post/FilesInput.tsx
"use client"
import { useRef, useState } from "react"
import { FileEntry } from "@/app/types"
import { Upload, FileText, X, Loader2 } from "lucide-react"
import { useUploadThing } from "@/app/lib/uploadthing"

export function FilesInput({ files, onChange }: {
  files: FileEntry[]
  onChange: (files: FileEntry[]) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const { startUpload } = useUploadThing("postFile", {
    onClientUploadComplete: (res) => {
      const newEntries: FileEntry[] = res.map(f => ({
        id: crypto.randomUUID(),
        url: f.url,           
        name: f.name,
        sizeFormatted: formatSize(f.size),
        sizeBytes: f.size,
        mimeType: f.type,
      }))
      onChange([...files, ...newEntries])
      setIsUploading(false)
    },
    onUploadError: (err) => {
      console.error("Upload failed:", err)
      setIsUploading(false)
    },
  })

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? [])
    if (!selected.length) return
    setIsUploading(true)
    await startUpload(selected)  
    e.target.value = ""
  }

  function removeFile(id: string) {
    onChange(files.filter(f => f.id !== id))
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onClick={() => !isUploading && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition group ${
          isUploading
            ? "border-rose-300 cursor-wait"
            : "border-slate-200 dark:border-slate-700 cursor-pointer hover:border-rose-400 dark:hover:border-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-900/10"
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 text-rose-400 animate-spin mx-auto" />
            <p className="text-sm text-rose-500">Uploading...</p>
          </div>
        ) : (
          <>
            <Upload className="w-6 h-6 text-slate-400 group-hover:text-rose-400 mx-auto mb-2 transition" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Click to upload files
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              PDF, images, documents — any format
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFiles}
          disabled={isUploading}
        />
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
                  <p className="text-xs text-slate-400">{f.sizeFormatted}</p>
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