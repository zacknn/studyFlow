import z from "zod"

const idSchema = z.string().min(1).max(255)
const httpsUrl = z.url({ protocol: /^https?$/i }).max(2048)
const linkLabel = z.string().min(1).max(255)

export const CreateLinkInputSchema = z.object({
  postId: idSchema,
  url: httpsUrl,
  label: linkLabel.optional(),
})

export const UpdateLinkInputSchema = z.object({
  id: idSchema,
  url: httpsUrl.optional(),
  label: linkLabel.optional(),
})

export const DeleteLinkInputSchema = z.object({
  id: idSchema,
})

export const LinkOutputSchema = z.object({
  id: idSchema,
})