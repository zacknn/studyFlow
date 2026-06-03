import { implement } from "@orpc/server";
import { contract } from "../contract";
import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/authMiddleware";

const os = implement(contract).$context<{ headers: Headers }>();


export const CreateComment = os.Comment.create
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {
    const discussion = await prisma.discussion.findUnique({
      where: { id: input.discussionId }
    })

    if (!discussion) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Discussion", resourceId: input.discussionId }
      })
    }

    const comment = await prisma.comment.create({
      data: {
        content: input.content,
        authorId: context.user.id,
        discussionId: input.discussionId,
      }
    })

    return { id: comment.id }
  })

export const UpdateComment = os.Comment.update
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {
    const comment = await prisma.comment.findUnique({
      where: { id: input.id }
    })

    if (!comment) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Comment", resourceId: input.id }
      })
    }

    if (comment.authorId !== context.user.id) {
      throw errors.FORBIDDEN()
    }

    const updated = await prisma.comment.update({
      where: { id: input.id },
      data: { content: input.content }
    })

    return { id: updated.id }
  })

export const DeleteComment = os.Comment.delete
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {
    const comment = await prisma.comment.findUnique({
      where: { id: input.id }
    })

    if (!comment) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Comment", resourceId: input.id }
      })
    }

    if (comment.authorId !== context.user.id) {
      throw errors.FORBIDDEN()
    }

    await prisma.comment.delete({ where: { id: input.id } })

    return { id: input.id }
  })