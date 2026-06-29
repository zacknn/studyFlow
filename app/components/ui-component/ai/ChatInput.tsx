"use client"

import { useRef, useState } from "react"
import { Send, Paperclip, X, FileText, Loader2 } from "lucide-react"
import { useUploadThing } from "@/app/lib/uploadthing"

interface ChatInputProps {
  onSend: (text: string, fileUrl?: string) => void
  isLoading: boolean
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("")
  const [uploadedFile, setUploadedFile] = useState<{ url: string; name: string } | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const { startUpload } = useUploadThing("postFile", {
    onClientUploadComplete: (res) => {
      setUploadedFile({ url: res[0].url, name: res[0].name })
      setIsUploading(false)
    },
    onUploadError: () => setIsUploading(false),
  })

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    await startUpload([file])
    e.target.value = ""
  }

  function handleSend() {
    if (!input.trim() && !uploadedFile) return
    onSend(input, uploadedFile?.url)
    setInput("")
    setUploadedFile(null)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const busy = isLoading || isUploading

  return (
    <div className="p-4 border-t border-slate-800/60">
      <div className="max-w-3xl mx-auto space-y-2">
        {uploadedFile && (
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 border border-slate-700/40 rounded-xl w-fit">
            <FileText className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="text-xs text-slate-300 truncate max-w-[180px]">
              {uploadedFile.name}
            </span>
            <button onClick={() => setUploadedFile(null)} className="ml-1 text-slate-500 hover:text-rose-400">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="flex items-end gap-2 bg-slate-800/50 border border-slate-700/50 focus-within:border-rose-500/40 rounded-2xl px-4 py-3 transition-colors">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="shrink-0 text-slate-600 hover:text-rose-400 transition disabled:opacity-40"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin text-rose-400" /> : <Paperclip className="w-4 h-4" />}
          </button>
          <input ref={fileRef} type="file" className="hidden" onChange={handleFileChange} />

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            disabled={busy}
            rows={1}
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none resize-none max-h-36 disabled:opacity-50 leading-relaxed"
            style={{ scrollbarWidth: "none" }}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={busy || (!input.trim() && !uploadedFile)}
            className="shrink-0 w-8 h-8 bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-slate-700 text-center">
          AI can make mistakes — verify important information.
        </p>
      </div>
    </div>
  )
}