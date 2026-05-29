"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, PhoneOff, Mic, MicOff, Volume2, Loader2, Bot, User } from "lucide-react"
import { useVapi } from "@/app/lib/hooks/use-vapi"

interface VoiceTeacherProps {
  postId?: string
  postTitle?: string
}

export function VoiceTeacher({ postId, postTitle }: VoiceTeacherProps) {
  const {
    isSessionActive,
    isLoading,
    isMuted,
    volumeLevel,
    transcript,
    error,
    startSession,
    endSession,
    toggleMute,
  } = useVapi()

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            isSessionActive
              ? "bg-green-100 dark:bg-green-900/30"
              : "bg-rose-100 dark:bg-rose-900/30"
          }`}>
            <Bot className={`w-4 h-4 ${
              isSessionActive ? "text-green-500" : "text-rose-500"
            }`} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white text-sm">
              Voice Teacher
            </p>
            <p className="text-xs text-slate-500">
              {isSessionActive
                ? "Session active"
                : postTitle
                  ? `Study "${postTitle}"`
                  : "General tutor"
              }
            </p>
          </div>
        </div>

        {/* Volume indicator */}
        <AnimatePresence>
          {isSessionActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              <div className="flex gap-0.5 items-end h-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: volumeLevel > i * 0.2 ? 16 : 4,
                      backgroundColor: volumeLevel > i * 0.2 ? "#f43f5e" : "#cbd5e1"
                    }}
                    transition={{ duration: 0.1 }}
                    className="w-1 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Transcript */}
      <AnimatePresence>
        {transcript.length > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 max-h-48 overflow-y-auto space-y-3">
              {transcript.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3 h-3 text-rose-500" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-rose-500 text-white rounded-tr-none"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3 h-3 text-slate-500" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-5 py-2 text-xs text-red-500 bg-red-50 dark:bg-red-900/10"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="p-4">
        {!isSessionActive ? (
          // Start button
          <motion.button
            onClick={() => startSession(postId)}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Phone className="w-4 h-4" />
                Start Voice Session
              </>
            )}
          </motion.button>
        ) : (
          // Active controls
          <div className="flex gap-3">
            <motion.button
              onClick={toggleMute}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition ${
                isMuted
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {isMuted
                ? <><MicOff className="w-4 h-4" /> Unmute</>
                : <><Mic className="w-4 h-4" /> Mute</>
              }
            </motion.button>

            <motion.button
              onClick={endSession}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition"
            >
              <PhoneOff className="w-4 h-4" />
              End Session
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}