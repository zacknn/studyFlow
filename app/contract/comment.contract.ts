import { base } from "../lib/base";
import {
  CreateCommentInputSchema,
  UpdateCommentInputSchema,
  DeleteCommentInputSchema,
  MutationOutputSchema,
} from "../schemas/comment.schemas"

export const CreateCommentContract = base
  .route({
    method: "POST",
    path: "/discussions/{discussionId}/comments",
    summary: "Add a comment to a discussion",
    tags: ["community"],
    successStatus: 201,
  })
  .input(CreateCommentInputSchema)
  .output(MutationOutputSchema)

export const UpdateCommentContract = base
  .route({
    method: "PATCH",
    path: "/comments/{id}",
    summary: "Update a comment",
    tags: ["community"],
  })
  .input(UpdateCommentInputSchema)
  .output(MutationOutputSchema)

export const DeleteCommentContract = base
  .route({
    method: "DELETE",
    path: "/comments/{id}",
    summary: "Delete a comment",
    tags: ["community"],
  })
  .input(DeleteCommentInputSchema)
  .output(MutationOutputSchema)