import { DiscussionDetail } from "@/app/components/ui-component/community/DiscussionDetail"

export default async function DiscussionPage({
  params,
}: {
  params: Promise<{ discussionId: string }>
}) {
  const { discussionId } = await params
  return <DiscussionDetail discussionId={discussionId} />
}