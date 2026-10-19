import z from "zod";

const idSchema = z.string().min(1).max(255);
const httpsUrl = z.url({ protocol: /^https?$/i }).max(2048);

export const CreateFileInputSchema = z.object({
  postId: idSchema,
  url: httpsUrl,
  name: z.string().min(1).max(255),
  size: z.number().int().nonnegative().max(16 * 1024 * 1024),
  mimeType: z.string().min(1).max(127),
  pages: z.number().int().positive().optional(),
});

export const DeleteFileInputSchema = z.object({
  id: idSchema,
});

export const FileOutputSchema = z.object({
  id: idSchema,
});
