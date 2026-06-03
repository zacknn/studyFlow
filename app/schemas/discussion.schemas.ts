import { z } from "zod"

const discussionTitle = z.string().min(1).max(300)
const discussionContent = z.string().min(1).max(10000)
const discussionTags = z.array(z.string().min(1).max(50)).max(10).optional().default([])

export const CreateDiscussionInputSchema = z.object({
  title: discussionTitle,
  content: discussionContent,
  tags: discussionTags,
})

export const UpdateDiscussionInputSchema = z.object({
  id: z.string(),
  title: discussionTitle.optional(),
  content: discussionContent.optional(),
  tags: discussionTags,
})

export const DeleteDiscussionInputSchema = z.object({
  id: z.string(),
})

export const GetDiscussionByIdInputSchema = z.object({
  id: z.string(),
})

export const ListDiscussionsInputSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(50).default(10),
  tag: z.string().optional(),
  authorId: z.string().optional(),
  search: z.string().optional(),
})

// output schemas
export const CommentAuthorSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  image: z.string().nullable(),
})

export const CommentSchema = z.object({
  id: z.string(),
  content: z.string(),
  authorId: z.string(),
  author: CommentAuthorSchema,
  discussionId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const DiscussionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  authorId: z.string(),
  author: CommentAuthorSchema,
  comments: z.array(CommentSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const DiscussionSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  authorId: z.string(),
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
  id: z.string(),
})

export type Discussion = z.infer<typeof DiscussionSchema>
export type DiscussionSummary = z.infer<typeof DiscussionSummarySchema>
export type CreateDiscussionInput = z.infer<typeof CreateDiscussionInputSchema>
export type UpdateDiscussionInput = z.infer<typeof UpdateDiscussionInputSchema>
export type Comment = z.infer<typeof CommentSchema>