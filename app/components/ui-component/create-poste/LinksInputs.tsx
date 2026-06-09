import { LinkEntry } from "@/app/types";
import { X, Plus } from "lucide-react";
import { useState } from "react";

export function LinksInput({ links, onChange }: { links: LinkEntry[]; onChange: (links: LinkEntry[]) => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function addLink() {
    onChange([...links, { id: crypto.randomUUID(), url: "", label: "" }]);
  }

  function validateUrl(url: string): string | null {
    if (!url) return null;
    if (!url.match(/^https?:\/\//)) {
      return "URL must start with http:// or https://";
    }
    try {
      new URL(url);
      return null;
    } catch {
      return "Please enter a valid URL";
    }
  }

  function updateLink(id: string, field: "url" | "label", value: string) {
    if (field === "url") {
      const error = validateUrl(value);
      setErrors(prev => ({ ...prev, [id]: error || "" }));
    }
    onChange(links.map(l => l.id === id ? { ...l, [field]: value } : l));
  }

  function removeLink(id: string) {
    onChange(links.filter(l => l.id !== id));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  }

  return (
    <div className="space-y-3">
      {links.map((link, i) => (
        <div key={link.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4">
          <div className="space-y-3">
            <div>
              <input
                value={link.url}
                onChange={e => updateLink(link.id, "url", e.target.value)}
                placeholder="https://example.com"
                className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-400 transition ${
                  errors[link.id] ? 'border-red-500 focus:ring-red-400' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors[link.id] && (
                <p className="text-red-500 text-xs mt-1">{errors[link.id]}</p>
              )}
            </div>
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
            className="mt-3 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition"
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
  );
}