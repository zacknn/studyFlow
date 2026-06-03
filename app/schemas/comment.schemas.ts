import { z } from "zod"

export const CreateCommentInputSchema = z.object({
  discussionId: z.string(),
  content: z.string().min(1).max(5000),
})

export const UpdateCommentInputSchema = z.object({
  id: z.string(),
  content: z.string().min(1).max(5000),
})

export const DeleteCommentInputSchema = z.object({
  id: z.string(),
})

export const MutationOutputSchema = z.object({
  id: z.string(),
})

export type CreateCommentInput = z.infer<typeof CreateCommentInputSchema>
export type UpdateCommentInput = z.infer<typeof UpdateCommentInputSchema>
export type DeleteCommentInput = z.infer<typeof DeleteCommentInputSchema>
export type MutationOutput = z.infer<typeof MutationOutputSchema>