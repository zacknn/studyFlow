import z, { string } from "zod";

export const CreateFileInputSchema = z.object({
  postId: z.string(),
  url: z.url(),
  name: z.string(),
  size: z.number().int().nonnegative(),
  mimeType: string().min(1),
  pages: z.number().int().positive().optional(),
});

export const DeleteFileInputSchema = z.object({
  id: string(),
});

export const FileOutputSchema = z.object({
  id: z.string(),
});
