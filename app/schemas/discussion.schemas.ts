import { z } from "zod"

const idSchema = z.string().min(1).max(255)
const discussionTitle = z.string().min(1).max(300)
  .refine((value) => value.trim().length > 0, "Title cannot be blank")
const discussionContent = z.string().min(1).max(10000)
  .refine((value) => value.trim().length > 0, "Content cannot be blank")
const discussionTags = z.array(
  z.string().min(1).max(50).refine((value) => value.trim().length > 0, "Tags cannot be blank"),
).max(10)

export const CreateDiscussionInputSchema = z.object({
  title: discussionTitle,
  content: discussionContent,
  tags: discussionTags.optional().default([]),
})

export const UpdateDiscussionInputSchema = z.object({
  id: idSchema,
  title: discussionTitle.optional(),
  content: discussionContent.optional(),
  tags: discussionTags.optional(),
})

export const DeleteDiscussionInputSchema = z.object({
  id: idSchema,
})

export const GetDiscussionByIdInputSchema = z.object({
  id: idSchema,
})

export const ListDiscussionsInputSchema = z.object({
  page: z.number().int().safe().positive().default(1),
  limit: z.number().int().positive().max(50).default(10),
  tag: z.string().min(1).max(50).optional(),
  authorId: idSchema.optional(),
  search: z.string().max(200)
    .refine((value) => value.trim().length > 0, "Search cannot be blank")
    .optional(),
})

// output schemas
export const CommentAuthorSchema = z.object({
  id: idSchema,
  name: z.string().nullable(),
  image: z.string().nullable(),
})

export const CommentSchema = z.object({
  id: idSchema,
  content: z.string(),
  authorId: idSchema,
  author: CommentAuthorSchema,
  discussionId: idSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const DiscussionSchema = z.object({
  id: idSchema,
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  authorId: idSchema,
  author: CommentAuthorSchema,
  comments: z.array(CommentSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const DiscussionSummarySchema = z.object({
  id: idSchema,
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  authorId: idSchema,
  author: CommentAuthorSchema,
  commentCount: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const PaginatedDiscussionsSchema = z.object({
  data: z.array(DiscussionSummarySchema),
  total: z.number().int(),
  page: z.number().int(),
  limit: z.number().int(),
})

export const MutationOutputSchema = z.object({
  id: idSchema,
})

export type Discussion = z.infer<typeof DiscussionSchema>
export type DiscussionSummary = z.infer<typeof DiscussionSummarySchema>
export type CreateDiscussionInput = z.infer<typeof CreateDiscussionInputSchema>
export type UpdateDiscussionInput = z.infer<typeof UpdateDiscussionInputSchema>
export type Comment = z.infer<typeof CommentSchema>