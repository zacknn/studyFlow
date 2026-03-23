import { base } from "../lib/base";
import z from "zod";
import {
  ListChatsInputSchema,
  ChatOutputSchema,
  GetChatInputSchema,
  DeleteChatInputSchema,
  MutationOutputSchema,
} from "../schemas/ai.schemas";

export const ListChatsContract = base
  .route({
    method: "GET",
    path: "/ai/chat",
    description: "list user chat history",
    tags: ["ai"],
  })
  .input(ListChatsInputSchema)
  .output(z.array(ChatOutputSchema));

export const GetChatContract = base
  .route({
    method: "GET",
    path: "/ai/chat/{id}",
    description: "get a single chat with messages",
    tags: ["ai"],
  })
  .input(GetChatInputSchema)
  .output(ChatOutputSchema);

export const DeleteChatContract = base
  .route({
    method: "DELETE",
    path: "/ai/chats/{id}",
    summary: "Delete a chat session",
    tags: ["ai"],
  })
  .input(DeleteChatInputSchema)
  .output(MutationOutputSchema);
