import {
  CreatePostInputSchema,
  DeletePostInputSchema,
  GetPostByIdInputSchema,
  ListPostsInputSchema,
  PaginatedPostsSchema,
  PostOutputSchema,
  UpdatePostInputSchema,
  IncrementPostLikesInputSchema,
  IncrementPostViewsInputSchema,
  PostMutationOutputSchema,
} from "../schemas/posts.schemas";
import { base } from "../lib/base";


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
  .output(PostOutputSchema);

export const UpdatePostContract = base
  .route({
    method: "PATCH",
    path: "/posts/{id}",
    summary: "Update a post",
    description: "Update a post, requires authentication and ownership",
    tags: ["posts"],
  })
  .input(UpdatePostInputSchema)
  .output(PostOutputSchema);

export const DeletePostContract = base
  .route({
    method: "DELETE",
    path: "/posts/{id}",
    summary: "Delete a post",
    description: "Delete a post, requires authentication and ownership",
    tags: ["posts"],
  })
  .input(DeletePostInputSchema)
  .output(PostOutputSchema);

export const GetPostByIdContract = base
  .route({
    method: "GET",
    path: "/posts/{id}",
    summary: "Get a post by ID",
    description: "Get a single post by its ID",
    tags: ["posts"],
  })
  .input(GetPostByIdInputSchema)
  .output(PostOutputSchema);

export const ListPostsContract = base
  .route({
    method: "GET",
    path: "/posts",
    summary: "List posts",
    description: "List posts with pagination and optional filters",
    tags: ["posts"],
  })
  .input(ListPostsInputSchema)
  .output(PaginatedPostsSchema);

export const IncrementLikesContract = base
  .route({
    method:"GET",
    path: "/posts/{id}/like",
    summary: "like a post",
    tags: ["posts"]
  })
  .input(IncrementPostLikesInputSchema)
  .output(PostMutationOutputSchema)

export const IncrementViewContract = base
  .route({
    method:"GET",
    path: "/posts/{id}/view",
    summary: "view a post",
    tags: ["posts"],
  })
  .input(IncrementPostViewsInputSchema)
  .output(PostMutationOutputSchema)
