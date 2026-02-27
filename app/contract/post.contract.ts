import { oc } from "@orpc/contract";
import z from "zod";
import {
  CreatePostInputSchema,
  DeletePostInputSchema,
  ListPostsInputSchema,
  PaginatedPostsSchema,
  PostOutputSchema,
  UpdatePostInputSchema,
} from "../schemas/posts.schemas";



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
    message:
      "the request could not be completed due to a conflict with the current state of the resource",
  },
});

export const CreatePostContract = base
  .input(CreatePostInputSchema)
  .output(PostOutputSchema);

export const UpdatePostContract = base
  .input(UpdatePostInputSchema)
  .output(PostOutputSchema);

export const DeletePostContract = base
  .input(DeletePostInputSchema)
  .output(PostOutputSchema);

export const GetPostByIdContract = base
  .input(DeletePostInputSchema)
  .output(PostOutputSchema);

export const ListPostsContract = base
  .input(ListPostsInputSchema)
  .output(PaginatedPostsSchema);
