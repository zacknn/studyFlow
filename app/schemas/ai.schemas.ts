import z from "zod";

const idSchema = z.string().min(1).max(255);

export const ListChatsInputSchema = z.object({
  page: z.number().int().safe().positive().default(1),
  limit: z.number().int().positive().max(50).default(20),
})

export const GetChatInputSchema = z.object({
  id: idSchema,
})

export const DeleteChatInputSchema = z.object({
  id: idSchema,
})

export const ChatOutputSchema = z.object({
  id: idSchema,
  title: z.string().nullable(),
  postId: idSchema.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  messages: z.array(z.object({
    id: z.string().cuid(),
    role: z.string(),
    content: z.string(),
    createdAt: z.date(),
  }))
})

export const MutationOutputSchema = z.object({
  id: idSchema,
})