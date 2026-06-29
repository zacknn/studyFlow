import { Bot, Lightbulb, FileSearch, HelpCircle, Sparkles } from "lucide-react"

const suggestions = [
  { icon: Lightbulb, label: "Explain", text: "Explain neural networks simply" },
  { icon: FileSearch, label: "Analyze", text: "Summarize this PDF for me" },
  { icon: HelpCircle, label: "Quiz me", text: "Quiz me on calculus derivatives" },
  { icon: Sparkles, label: "Study", text: "Explain recursion with examples" },
]

export function WelcomeScreen({ onSuggestion }: { onSuggestion: (text: string) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center">
          <Bot className="w-8 h-8 text-rose-400" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-950" />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-white mb-2">AI Study Tutor</h1>
        <p className="text-slate-500 text-sm max-w-sm">
          Ask anything, upload documents, or get quizzed on any topic.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSuggestion(s.text)}
            className="flex items-center gap-3 text-left px-4 py-3 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 hover:border-rose-500/30 rounded-xl text-sm text-slate-400 hover:text-slate-200 transition-all group"
          >
            <s.icon className="w-4 h-4 text-rose-400/70 group-hover:text-rose-400 shrink-0 transition-colors" />
            <div>
              <p className="text-xs text-rose-400/60 group-hover:text-rose-400/80 font-medium mb-0.5">
                {s.label}
              </p>
              <p className="text-xs leading-relaxed">{s.text}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}