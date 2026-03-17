import { useState } from "react";
import { Tag , X } from "lucide-react";
export function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState("")

  function addTag() {
    const trimmed = input.trim().toLowerCase()
    if (trimmed && !tags.includes(trimmed) && tags.length < 20) {
      onChange([...tags, trimmed])
      setInput("")
    }
  }

  function removeTag(tag: string) {
    onChange(tags.filter(t => t !== tag))
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag() } }}
          placeholder="Add a tag and press Enter"
          className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500 transition"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-medium hover:opacity-80 transition"
        >
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-medium px-3 py-1.5 rounded-full">
              <Tag className="w-3 h-3" />
              {tag}
              <button type="button" onClick={() => removeTag(tag)}>
                <X className="w-3 h-3 hover:text-rose-800 transition" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}