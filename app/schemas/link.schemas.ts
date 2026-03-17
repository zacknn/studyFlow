import z from "zod"
export const CreateLinkInputSchema = z.object({
  postId: z.string(),
  url: z.url(),
  label: z.string().min(1).optional(),
})

export const UpdateLinkInputSchema = z.object({
  id: z.string(),
  url: z.url().optional(),
  label: z.string().min(1).optional(),
})

export const DeleteLinkInputSchema = z.object({
  id: z.string(),
})

export const LinkOutputSchema = z.object({
  id: z.string(),
})