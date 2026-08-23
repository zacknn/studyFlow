import { EditDiscussionPageContent } from "@/app/components/ui-component/community/EditDiscussionPageContent"

export default async function EditDiscussionPage({
  params,
}: {
  params: Promise<{ discussionId: string }>
}) {
  const { discussionId } = await params

  return <EditDiscussionPageContent discussionId={discussionId} />
}
