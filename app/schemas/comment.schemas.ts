import { z } from "zod"

const idSchema = z.string().min(1).max(255);
const commentContent = z.string().min(1).max(5000)
  .refine((value) => value.trim().length > 0, "Comment cannot be blank");

export const CreateCommentInputSchema = z.object({
  discussionId: idSchema,
  content: commentContent,
})

export const UpdateCommentInputSchema = z.object({
  id: idSchema,
  content: commentContent,
})

export const DeleteCommentInputSchema = z.object({
  id: idSchema,
})

export const MutationOutputSchema = z.object({
  id: idSchema,
})

export type CreateCommentInput = z.infer<typeof CreateCommentInputSchema>
export type UpdateCommentInput = z.infer<typeof UpdateCommentInputSchema>
export type DeleteCommentInput = z.infer<typeof DeleteCommentInputSchema>
export type MutationOutput = z.infer<typeof MutationOutputSchema>