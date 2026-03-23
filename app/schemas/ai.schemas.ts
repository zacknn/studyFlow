import z from "zod";

export const ListChatsInputSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(50).default(20),
})

export const GetChatInputSchema = z.object({
  id: z.string(),
})

export const DeleteChatInputSchema = z.object({
  id: z.string(),
})

export const ChatOutputSchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  postId: z.string().nullable(),
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
  id: z.string(),
})