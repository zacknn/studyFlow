import { implement } from "@orpc/server";
import { contract } from "../contract";
import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/authMiddleware";


const os = implement(contract).$context<{ headers: Headers }>();

export const ListChats = os.AI.listChats
  .use(authMiddleware)
  .handler(async ({ input, context }) => {
    return await prisma.aIHistory.findMany({
      where: { userId: context.user.id },
      orderBy: { updatedAt: "desc" },
      skip: (input.page - 1) * input.limit,
      take: input.limit,
      include: { messages: true }
    })
  })

export const GetChat = os.AI.getChat
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {
    const chat = await prisma.aIHistory.findUnique({
      where: { id: input.id },
      include: { messages: { orderBy: { createdAt: "asc" } } }
    })

    if (!chat) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Chat", resourceId: input.id }
      })
    }

    if (chat.userId !== context.user.id) {
      throw errors.FORBIDDEN()
    }

    return chat
  })

export const DeleteChat = os.AI.deleteChat
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {
    const chat = await prisma.aIHistory.findUnique({
      where: { id: input.id }
    })

    if (!chat) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Chat", resourceId: input.id }
      })
    }

    if (chat.userId !== context.user.id) {
      throw errors.FORBIDDEN()
    }

    await prisma.aIHistory.delete({ where: { id: input.id } })

    return { id: input.id }
  })