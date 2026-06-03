import { AlertTriangle, Loader2, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DeleteConfirmModalProps {
  title?: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
  isPending: boolean
}

export function DeleteConfirmModal({
  title = "Delete",
  description = "This action cannot be undone.",
  onConfirm,
  onCancel,
  isPending,
}: DeleteConfirmModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full mx-4 space-y-4 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="text-xs text-slate-500">This action cannot be undone</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            {description}
          </p>

          <div className="flex gap-3 pt-1">
            <button
              onClick={onCancel}
              disabled={isPending}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isPending}
              className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {isPending
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Trash2 className="w-4 h-4" />
              }
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}