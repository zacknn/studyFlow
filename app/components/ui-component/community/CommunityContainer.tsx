"use client"
import { useState } from "react"
import { DiscussionList } from "./DiscussionList"
import { TrendingSidebar } from "./TrendingSidebar"
import { CreateDiscussionModal } from "./CreateDiscussionModal"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"

export function CommunityContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Community
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Ask questions, share advice, learn together
          </p>
        </div>

        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-medium transition shadow-lg shadow-rose-500/20"
        >
          <Plus className="w-4 h-4" />
          New Discussion
        </motion.button>
      </motion.div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search discussions..."
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-400 transition"
        />
      </motion.div>

      {/* Active tag filter */}
      {activeTag && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="text-sm text-slate-500">Filtered by:</span>
          <span className="flex items-center gap-1.5 text-sm bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full">
            #{activeTag}
            <button
              onClick={() => setActiveTag(null)}
              className="hover:text-rose-800 transition"
            >
              ×
            </button>
          </span>
        </motion.div>
      )}

      {/* Main layout */}
      <div className="flex gap-6">
        {/* Left — discussion list */}
        <div className="flex-1 min-w-0">
          <DiscussionList
            tag={activeTag ?? undefined}
            search={search || undefined}
          />
        </div>

        {/* Right — sidebar */}
        <div className="hidden lg:block w-72 shrink-0">
          <TrendingSidebar
            activeTag={activeTag}
            onTagClick={tag => setActiveTag(tag === activeTag ? null : tag)}
          />
        </div>
      </div>

      {/* Create modal */}
      <CreateDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}