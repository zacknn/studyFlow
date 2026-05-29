import { AIChatContainer } from "@/app/components/ui-component/ai/AIChatContainer"
import { VoiceTeacher } from "@/app/components/ui-component/ai/VoiceTeacher"
export default function AITutorPage() {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-slate-950">
      <AIChatContainer />
    </div>
  )
}