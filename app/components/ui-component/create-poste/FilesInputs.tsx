"use client"
import { useRef, useState } from "react"
import { FileEntry } from "@/app/types"
import { Upload, FileText, X, Loader2, AlertTriangle } from "lucide-react"
import { useUploadThing } from "@/app/lib/uploadthing"
import { formatSize } from "@/app/lib/format_size"
import { ACCEPTED_UPLOAD_DESCRIPTION, getUnsupportedUploadFiles, isAllowedUploadFile } from "@/app/lib/file-upload"

export function FilesInput({ files, onChange }: {
  files: FileEntry[]
  onChange: (files: FileEntry[]) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [warning, setWarning] = useState<string | null>(null)

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

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? [])
    if (!selected.length) return

    const rejected = getUnsupportedUploadFiles(selected)
    if (rejected.length > 0) {
      setWarning(`${rejected.map(file => file.name).join(", ")} cannot be uploaded. ${ACCEPTED_UPLOAD_DESCRIPTION}`)
    } else {
      setWarning(null)
    }

    const validFiles = selected.filter(isAllowedUploadFile)
    if (!validFiles.length) {
      e.target.value = ""
      return
    }

    setIsUploading(true)
    await startUpload(validFiles)
    e.target.value = ""
  }

  function removeFile(id: string) {
    onChange(files.filter(f => f.id !== id))
  }

  return (
    <div className="space-y-3">
      {warning && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-700/60 dark:bg-amber-950/20 dark:text-amber-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{warning}</span>
        </div>
      )}

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
              PDF, images, and plain text files
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFiles}
          accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.txt,.md,.csv"
          disabled={isUploading}
        />
      </div>

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