import {
  CreateFileInputSchema,
  DeleteFileInputSchema,
  FileOutputSchema,
} from "../schemas/file.shemas";
import { base } from "../lib/base";

export const CreateFileContract = base
  .route({
    method: "POST",
    path: "/posts/{postId}/files",
    summary: "Attach a file to a post",
    tags: ["files"],
  })
  .input(CreateFileInputSchema)
  .output(FileOutputSchema)

export const DeleteFileContract = base
  .route({
    method: "DELETE",
    path: "/files/{id}",
    summary: "Delete a file",
    tags: ["files"],
  })
  .input(DeleteFileInputSchema)
  .output(FileOutputSchema)