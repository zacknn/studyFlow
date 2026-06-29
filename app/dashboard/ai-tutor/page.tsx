import { AIChatContainer } from "@/app/components/ui-component/ai/AIChatContainer"
import { auth } from "@/app/lib/auth"
import { headers } from "next/headers"
import prisma from "@/app/lib/prisma"

export default async function AITutorPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  let initialChats: { id: string; title: string | null; updatedAt: Date }[] = []
  if (session?.user) {
    initialChats = await prisma.aIHistory.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      take: 50,
      select: { id: true, title: true, updatedAt: true }
    })
  }

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-slate-950">
      <AIChatContainer 
        userId={session?.user?.id ?? null} 
        initialChats={initialChats} 
      />
    </div>
  )
}