import { CommunityContainer } from "@/app/components/ui-component/community/CommunityContainer"
import { Suspense } from "react"
export default function CommunityPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CommunityContainer />
    </Suspense>
  )
}