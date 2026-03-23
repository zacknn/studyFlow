import { motion } from "framer-motion"
import { Bot, Lightbulb, FileSearch, HelpCircle, Sparkles } from "lucide-react"

const suggestions = [
  {
    icon: <Lightbulb className="w-4 h-4" />,
    label: "Explain",
    text: "Explain the concept of neural networks simply",
  },
  {
    icon: <FileSearch className="w-4 h-4" />,
    label: "Analyze",
    text: "Upload a PDF and summarize it for me",
  },
  {
    icon: <HelpCircle className="w-4 h-4" />,
    label: "Quiz me",
    text: "Quiz me on calculus derivatives",
  },
  {
    icon: <Sparkles className="w-4 h-4" />,
    label: "Study",
    text: "Help me understand recursion with examples",
  },
]

export function WelcomeScreen({ onSuggestion }: { onSuggestion: (text: string) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mb-6"
      >
        <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center">
          <Bot className="w-8 h-8 text-rose-400" />
        </div>
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute inset-0 border border-rose-500/20 rounded-2xl"
        />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-950" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-center mb-10"
      >
        <h1 className="text-2xl font-bold text-white mb-2">
          AI Study Tutor
        </h1>
        <p className="text-slate-500 text-sm max-w-sm">
          Ask anything, upload documents to analyze,
          or get quizzed on any topic.
        </p>
      </motion.div>

      {/* Suggestions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
        {suggestions.map((s, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.07 }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestion(s.text)}
            className="flex items-center gap-3 text-left px-4 py-3 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 hover:border-rose-500/30 rounded-xl text-sm text-slate-400 hover:text-slate-200 transition-all group"
          >
            <span className="text-rose-400/70 group-hover:text-rose-400 shrink-0 transition-colors">
              {s.icon}
            </span>
            <div>
              <p className="text-xs text-rose-400/60 group-hover:text-rose-400/80 font-medium mb-0.5 transition-colors">
                {s.label}
              </p>
              <p className="text-xs leading-relaxed">{s.text}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}