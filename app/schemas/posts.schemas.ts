import { z } from "zod"

/* =========================================================
   Enums
========================================================= */

export const PostTypeEnum = z.enum(["tutorial", "reference"])

/* =========================================================
   Shared Fields
========================================================= */

const postTitle = z.string().min(1).max(200)
const postDescription = z.string().max(5000).optional()
const postType = PostTypeEnum.optional()
const postIsPublic = z.boolean().optional().default(true)
const postTags = z.array(z.string().min(1).max(50)).max(20).optional().default([])

/* =========================================================
   Related Entities (Read Only)
========================================================= */

export const FileSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  size: z.number().int().nonnegative(),
  mimeType: z.string().min(1),
  url: z.string().url(),
  pages: z.number().int().positive().optional().nullable(),
  postId: z.string().cuid(),
  createdAt: z.date(),
})

export const LinkSchema = z.object({
  id: z.cuid(),
  url: z.url(),
  label: z.string().min(1).optional().nullable(),
  postId: z.cuid(),
  createdAt: z.date(),
})

/* =========================================================
   Core Post (DB Shape)
========================================================= */

export const PostSchema = z.object({
  id: z.cuid(),
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  type: PostTypeEnum.optional().nullable(),
  isPublic: z.boolean(),
  authorId: z.cuid(),
  views: z.number().int().nonnegative(),
  likes: z.number().int().nonnegative(),
  tags: z.array(z.string().min(1)),
  createdAt: z.date(),
  updatedAt: z.date(),
  files: z.array(FileSchema),
  links: z.array(LinkSchema),
})

export type Post = z.infer<typeof PostSchema>

/* =========================================================
   CREATE
========================================================= */

export const CreatePostInputSchema = z.object({
  id: z.cuid(),
  title: postTitle,
  description: postDescription,
  type: postType,
  isPublic: postIsPublic,
  tags: postTags,
})

export type CreatePostInput = z.infer<typeof CreatePostInputSchema>

/* =========================================================
   UPDATE
========================================================= */

export const UpdatePostInputSchema = z.object({
  id: z.cuid(),
  title: postTitle.optional(),
  description: postDescription,
  type: postType,
  isPublic: postIsPublic,
  tags: postTags,
})

export type UpdatePostInput = z.infer<typeof UpdatePostInputSchema>

/* =========================================================
   DELETE
========================================================= */

export const DeletePostInputSchema = z.object({
  id: z.cuid(),
})

export type DeletePostInput = z.infer<typeof DeletePostInputSchema>

/* =========================================================
   GET BY ID
========================================================= */

export const GetPostByIdInputSchema = z.object({
  id: z.cuid(),
})

export type GetPostByIdInput = z.infer<typeof GetPostByIdInputSchema>

/* =========================================================
   OUTPUT
========================================================= */

export const PostOutputSchema = z.object({
  id: z.cuid(),
})

export type PostOutput = z.infer<typeof PostOutputSchema>

/* =========================================================
   LIST / PAGINATION
========================================================= */

export const ListPostsInputSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  type: PostTypeEnum.optional(),
  authorId: z.cuid().optional(),
  isPublic: z.boolean().optional(),
  tag: z.string().optional(),
})

export type ListPostsInput = z.infer<typeof ListPostsInputSchema>

/* =========================================================
   PAGINATED OUTPUT
========================================================= */

export const PaginatedPostsSchema = z.object({
  data: z.array(PostSchema),
  total: z.number().int(),
  page: z.number().int(),
  limit: z.number().int(),
})

export type PaginatedPosts = z.infer<typeof PaginatedPostsSchema>