import { base } from "../lib/base";
import {
  CreateDiscussionInputSchema,
  UpdateDiscussionInputSchema,
  DeleteDiscussionInputSchema,
  GetDiscussionByIdInputSchema,
  ListDiscussionsInputSchema,
  DiscussionSchema,
  PaginatedDiscussionsSchema,
  MutationOutputSchema,
} from "../schemas/discussion.schemas"

export const CreateDiscussionContract = base
  .route({
    method: "POST",
    path: "/discussions",
    summary: "Create a discussion",
    tags: ["community"],
    successStatus: 201,
  })
  .input(CreateDiscussionInputSchema)
  .output(MutationOutputSchema)

export const ListDiscussionsContract = base
  .route({
    method: "GET",
    path: "/discussions",
    summary: "List discussions",
    tags: ["community"],
  })
  .input(ListDiscussionsInputSchema)
  .output(PaginatedDiscussionsSchema)

export const GetDiscussionByIdContract = base
  .route({
    method: "GET",
    path: "/discussions/{id}",
    summary: "Get a discussion with comments",
    tags: ["community"],
  })
  .input(GetDiscussionByIdInputSchema)
  .output(DiscussionSchema)

export const UpdateDiscussionContract = base
  .route({
    method: "PATCH",
    path: "/discussions/{id}",
    summary: "Update a discussion",
    tags: ["community"],
  })
  .input(UpdateDiscussionInputSchema)
  .output(MutationOutputSchema)

export const DeleteDiscussionContract = base
  .route({
    method: "DELETE",
    path: "/discussions/{id}",
    summary: "Delete a discussion",
    tags: ["community"],
  })
  .input(DeleteDiscussionInputSchema)
  .output(MutationOutputSchema)