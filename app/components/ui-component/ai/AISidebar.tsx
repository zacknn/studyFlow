"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, MessageSquare, Trash2, ChevronLeft, ChevronRight, Loader2, Bot } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { useListChat, useDeleteChat } from "@/app/lib/queries/ai.queries"
import { cn } from "@/lib/utils"

interface AISidebarProps {
  activeChatId: string | null
  onSelectChat: (id: string) => void
  onNewChat: () => void
}

export function AISidebar({ activeChatId, onSelectChat, onNewChat }: AISidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const { data: chats, isLoading } = useListChat()
  const { mutate: deleteChat } = useDeleteChat()

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div
        animate={{ width: collapsed ? 56 : 260 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="relative flex flex-col border-r border-slate-800/60 bg-slate-900/50 backdrop-blur-sm shrink-0 overflow-hidden"
      >
        {/* Toggle */}
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute -right-3 top-7 z-20 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-700 transition shadow-lg"
        >
          {collapsed
            ? <ChevronRight className="w-3 h-3 text-slate-400" />
            : <ChevronLeft className="w-3 h-3 text-slate-400" />
          }
        </motion.button>

        {/* Header */}
        <div className="p-3 shrink-0">
          <div className={cn("flex items-center gap-2 mb-3", collapsed && "justify-center")}>
            <div className="w-7 h-7 bg-rose-500/20 border border-rose-500/30 rounded-lg flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm font-semibold text-slate-200 whitespace-nowrap"
                >
                  AI Tutor
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={onNewChat}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-2 w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition text-sm font-medium",
                  collapsed ? "justify-center p-2.5" : "px-3 py-2.5"
                )}
              >
                <Plus className="w-4 h-4 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap"
                    >
                      New Chat
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">New Chat</TooltipContent>}
          </Tooltip>
        </div>

        <Separator className="bg-slate-800/60" />

        {/* Chat list */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {isLoading && (
              <div className="flex justify-center py-8">
                <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
              </div>
            )}

            <AnimatePresence>
              {chats?.map((chat, i) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        onClick={() => onSelectChat(chat.id)}
                        className={cn(
                          "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 cursor-pointer transition-all",
                          activeChatId === chat.id
                            ? "bg-slate-700/80 text-white"
                            : "text-slate-500 hover:bg-slate-800/60 hover:text-slate-300"
                        )}
                      >
                        <MessageSquare className="w-3.5 h-3.5 shrink-0" />

                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex-1 text-xs truncate"
                            >
                              {chat.title ?? "New Chat"}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {!collapsed && (
                          <motion.button
                            onClick={e => {
                              e.stopPropagation()
                              deleteChat({ id: chat.id })
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-rose-400 transition shrink-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </motion.button>
                        )}
                      </div>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        {chat.title ?? "New Chat"}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </motion.div>
              ))}
            </AnimatePresence>

            {!isLoading && chats?.length === 0 && !collapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-slate-600 text-center py-8 px-4"
              >
                No conversations yet. Start a new chat!
              </motion.p>
            )}
          </div>
        </ScrollArea>
      </motion.div>
    </TooltipProvider>
  )
}