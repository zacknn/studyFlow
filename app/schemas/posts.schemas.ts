import { z } from "zod";

/* =========================================================
   Enums
========================================================= */

export const PostTypeEnum = z.enum(["tutorial", "reference"]);

/* =========================================================
   Shared Fields
========================================================= */

const idSchema = z.string().min(1).max(255);
const postTitle = z.string().min(1).max(200)
  .refine((value) => value.trim().length > 0, "Title cannot be blank");
const postDescription = z.string().max(5000).optional();
const postType = PostTypeEnum.optional();
const postTags = z.array(
  z.string().min(1).max(50).refine((value) => value.trim().length > 0, "Tags cannot be blank"),
).max(20);

/* =========================================================
   Related Entities (Read Only)
========================================================= */

export const FileSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  size: z.number().int().nonnegative(),
  mimeType: z.string().min(1),
  url: z.string(),
  pages: z.number().int().positive().optional().nullable(),
  postId: z.string(),
  createdAt: z.date(),
});

export const LinkSchema = z.object({
  id: z.string(),
  url: z.string(),
  label: z.string().min(1).optional().nullable(),
  postId: z.string(),
  createdAt: z.date(),
});

/* =========================================================
   Core Post (DB Shape)
========================================================= */

export const AuthorSchema = z.object({
  id : z.string(),
  name : z.string().nullable(),
  image : z.string().nullable(),
})

export const PostSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  type: PostTypeEnum.optional().nullable(),
  isPublic: z.boolean(),
  authorId: z.string(),
  author : AuthorSchema, 
  views: z.number().int().nonnegative(),
  likes: z.number().int().nonnegative(),
  tags: z.array(z.string().min(1)),
  createdAt: z.date(),
  updatedAt: z.date(),
  files: z.array(FileSchema),
  links: z.array(LinkSchema),
});



export type Post = z.infer<typeof PostSchema>;

/* =========================================================
   CREATE
========================================================= */

export const CreatePostInputSchema = z.object({
  title: postTitle,
  description: postDescription,
  type: postType,
  isPublic: z.boolean().optional().default(true),
  tags: postTags.optional().default([]),
});

export type CreatePostInput = z.infer<typeof CreatePostInputSchema>;

/* =========================================================
   UPDATE
========================================================= */

export const UpdatePostInputSchema = z.object({
  id: idSchema,
  title: postTitle.optional(),
  description: postDescription,
  type: postType,
  isPublic: z.boolean().optional(),
  tags: postTags.optional(),
});

export type UpdatePostInput = z.infer<typeof UpdatePostInputSchema>;

/* =========================================================
   DELETE
========================================================= */

export const DeletePostInputSchema = z.object({
  id: idSchema,
});

export type DeletePostInput = z.infer<typeof DeletePostInputSchema>;

/* =========================================================
   GET BY ID
========================================================= */

export const GetPostByIdInputSchema = z.object({
  id: idSchema,
});

export type GetPostByIdInput = z.infer<typeof GetPostByIdInputSchema>;

/* =========================================================
   OUTPUT
========================================================= */

export const PostOutputSchema = PostSchema;

export type PostOutput = z.infer<typeof PostOutputSchema>;

/* =========================================================
   LIST / PAGINATION
========================================================= */

export const ListPostsInputSchema = z.object({
  page: z.coerce.number().int().safe().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  type: PostTypeEnum.optional(),
  authorId: idSchema.optional(),
  isPublic: z.union([z.boolean(), z.stringbool()]).optional(),
  tag: z.string().min(1).max(50).optional(),
  search: z.string().max(200)
    .refine((value) => value.trim().length > 0, "Search cannot be blank")
    .optional(),
});

export type ListPostsInput = z.infer<typeof ListPostsInputSchema>;

/* =========================================================
   PAGINATED OUTPUT
========================================================= */

export const PaginatedPostsSchema = z.object({
  data: z.array(PostSchema),
  total: z.number().int(),
  page: z.number().int(),
  limit: z.number().int(),
  totalPages: z.number().int().min(0),
});

export type PaginatedPosts = z.infer<typeof PaginatedPostsSchema>;


export const IncrementPostLikesInputSchema = z.object({
  id: idSchema,
})

export const IncrementPostViewsInputSchema = z.object({
  id: idSchema,
})

export const PostMutationOutputSchema = z.object({
  id: idSchema,
})