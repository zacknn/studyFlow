import {
  CreateLinkInputSchema,
  DeleteLinkInputSchema,
  UpdateLinkInputSchema,
  LinkOutputSchema,
} from "../schemas/link.schemas";
import { base } from "../lib/base";

export const CreateLinkContract = base
  .route({
    method: "POST",
    path: "/posts/{postId}/links",
    summary: "Attach a link to a post",
    tags: ["links"],
  })
  .input(CreateLinkInputSchema)
  .output(LinkOutputSchema)

export const UpdateLinkContract = base
  .route({
    method: "PUT",
    path: "/links/{id}",
    summary: "Update a link",
    tags: ["links"],
  })
  .input(UpdateLinkInputSchema)
  .output(LinkOutputSchema)

export const DeleteLinkContract = base
  .route({
    method: "DELETE",
    path: "/links/{id}",
    summary: "Delete a link",
    tags: ["links"],
  })
  .input(DeleteLinkInputSchema)
  .output(LinkOutputSchema)