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
    <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-10">
        <h1 className="mb-3 text-3xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:mb-4 sm:text-4xl md:text-5xl">
          Your{" "}
          <span className="bg-rose-500 text-white px-3 py-1 rounded-lg inline-block transform -rotate-1 shadow-lg shadow-rose-500/20">
            AI study
          </span>{" "}
          assistant
        </h1>
        <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">
          Ask questions, work through problems, and pick up right where you left off.
        </p>
      </div>

      <ChatbotShell activeChatId={chat ?? null} />
    </div>
  )
}