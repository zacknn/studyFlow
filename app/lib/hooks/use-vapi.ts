"use client"
import { useEffect, useRef, useState, useCallback } from "react"
import Vapi from "@vapi-ai/web"

interface Message {
  role: "user" | "assistant"
  text: string
}

export function useVapi() {
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [transcript, setTranscript] = useState<Message[]>([])
  const [error, setError] = useState<string | null>(null)
  const vapiRef = useRef<Vapi | null>(null)

  useEffect(() => {
    // initialize Vapi with your public key
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!)
    vapiRef.current = vapi

    // call started
    vapi.on("call-start", () => {
      setIsSessionActive(true)
      setIsLoading(false)
      setError(null)
    })

    // call ended
    vapi.on("call-end", () => {
      setIsSessionActive(false)
      setIsLoading(false)
      setVolumeLevel(0)
    })

    // volume changes — for visual indicator
    vapi.on("volume-level", (level: number) => {
      setVolumeLevel(level)
    })

    // live transcript
    vapi.on("message", (message: any) => {
      if (
        message.type === "transcript" &&
        message.transcriptType === "final"
      ) {
        setTranscript(prev => [...prev, {
          role: message.role,
          text: message.transcript,
        }])
      }
    })

    // errors
    vapi.on("error", (err: any) => {
      console.error("Vapi error:", err)
      setError("Call failed. Please try again.")
      setIsLoading(false)
      setIsSessionActive(false)
    })

    return () => {
      vapi.stop()
    }
  }, [])

  async function startSession(postId?: string) {
    setIsLoading(true)
    setTranscript([])
    setError(null)

    try {
      // get dynamic assistant from your server
      const res = await fetch("/api/vapi/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: postId ?? null }),
      })

      if (!res.ok) throw new Error("Failed to create session")

      const { assistantId } = await res.json()

      // start the voice call
      await vapiRef.current?.start(assistantId)

    } catch (err) {
      console.error(err)
      setError("Failed to start session. Please try again.")
      setIsLoading(false)
    }
  }

  function endSession() {
    vapiRef.current?.stop()
    setTranscript([])
  }

  function toggleMute() {
    if (!vapiRef.current) return
    const newMuted = !isMuted
    vapiRef.current.setMuted(newMuted)
    setIsMuted(newMuted)
  }

  return {
    isSessionActive,
    isLoading,
    isMuted,
    volumeLevel,
    transcript,
    error,
    startSession,
    endSession,
    toggleMute,
  }
}