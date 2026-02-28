import { oc } from "@orpc/contract"
import z from "zod"
import {
  CreatePostInputSchema,
  DeletePostInputSchema,
  GetPostByIdInputSchema,
  ListPostsInputSchema,
  PaginatedPostsSchema,
  PostOutputSchema,
  UpdatePostInputSchema,
} from "../schemas/posts.schemas"

export const base = oc.errors({
  UNAUTHORIZED: {
    status: 401,
    message: "authentication required",
  },
  FORBIDDEN: {
    status: 403,
    message: "you do not have permission to perform this action",
  },
  NOT_FOUND: {
    status: 404,
    message: "the requested resource was not found",
    data: z.object({
      resourceType: z.string(),
      resourceId: z.string(),
    }),
  },
  CONFLICT: {
    status: 409,
    message: "the request could not be completed due to a conflict with the current state of the resource",
  },
})

export const CreatePostContract = base
  .route({
    method: "POST",
    path: "/posts",
    successStatus: 201,
    summary: "Create a new post",
    description: "Create a new post, requires authentication",
    tags: ["posts"],
  })
  .input(CreatePostInputSchema)
  .output(PostOutputSchema)

export const UpdatePostContract = base
  .route({
    method: "PATCH",
    path: "/posts/{id}",
    summary: "Update a post",
    description: "Update a post, requires authentication and ownership",
    tags: ["posts"],
  })
  .input(UpdatePostInputSchema)
  .output(PostOutputSchema)

export const DeletePostContract = base
  .route({
    method: "DELETE",
    path: "/posts/{id}",
    summary: "Delete a post",
    description: "Delete a post, requires authentication and ownership",
    tags: ["posts"],
  })
  .input(DeletePostInputSchema)
  .output(PostOutputSchema)

export const GetPostByIdContract = base
  .route({
    method: "GET",
    path: "/posts/{id}",
    summary: "Get a post by ID",
    description: "Get a single post by its ID",
    tags: ["posts"],
  })
  .input(GetPostByIdInputSchema)   // ✅ fixed
  .output(PostOutputSchema)

export const ListPostsContract = base
  .route({
    method: "GET",
    path: "/posts",
    summary: "List posts",
    description: "List posts with pagination and optional filters",
    tags: ["posts"],
  })
  .input(ListPostsInputSchema)
  .output(PaginatedPostsSchema)