import { LinkEntry } from "@/app/types";
import { X , Plus } from "lucide-react";


export function LinksInput({ links, onChange }: { links: LinkEntry[]; onChange: (links: LinkEntry[]) => void }) {
  function addLink() {
    onChange([...links, { id: crypto.randomUUID(), url: "", label: "" }])
  }

  function updateLink(id: string, field: "url" | "label", value: string) {
    onChange(links.map(l => l.id === id ? { ...l, [field]: value } : l))
  }

  function removeLink(id: string) {
    onChange(links.filter(l => l.id !== id))
  }

  return (
    <div className="space-y-3">
      {links.map((link, i) => (
        <div key={link.id} className="flex gap-2 items-start">
          <div className="flex-1 space-y-2">
            <input
              value={link.url}
              onChange={e => updateLink(link.id, "url", e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
            <input
              value={link.label}
              onChange={e => updateLink(link.id, "label", e.target.value)}
              placeholder="Label (optional)"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </div>
          <button
            type="button"
            onClick={() => removeLink(link.id)}
            className="mt-2.5 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addLink}
        className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-rose-500 transition"
      >
        <Plus className="w-4 h-4" />
        Add link
      </button>
    </div>
  )
}
