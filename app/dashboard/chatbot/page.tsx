import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/app/lib/auth"
import { ChatbotShell } from "@/app/components/ui-component/ai/chatbot/ChatbotShell"

export default async function ChatbotPage({
  searchParams,
}: {
  searchParams: Promise<{ chat?: string }>
}) {
  const { chat } = await searchParams

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-4 text-slate-900 dark:text-white">
          Your{" "}
          <span className="bg-rose-500 text-white px-3 py-1 rounded-lg inline-block transform -rotate-1 shadow-lg shadow-rose-500/20">
            AI study
          </span>{" "}
          assistant
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          Ask questions, work through problems, and pick up right where you left off.
        </p>
      </div>

      <ChatbotShell activeChatId={chat ?? null} />
    </div>
  )
}