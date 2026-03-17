import { implement } from "@orpc/server";
import { contract } from "../contract";
import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/authMiddleware";

const os = implement(contract).$context<{ headers: Headers }>();

export const CreateLink = os.Link.create
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {

    const post = await prisma.post.findUnique({
      where: { id: input.postId }
    })

    if (!post) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Post", resourceId: input.postId }
      })
    }

    if (post.authorId !== context.user.id) {
      throw errors.FORBIDDEN()
    }

    const link = await prisma.link.create({
      data: {
        url: input.url,
        label: input.label,
        postId: input.postId,
      }
    })

    return { id: link.id }
  })

export const UpdateLink = os.Link.update
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {

    const link = await prisma.link.findUnique({
      where: { id: input.id },
      include: { post: true }
    })

    if (!link) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Link", resourceId: input.id }
      })
    }

    if (link.post.authorId !== context.user.id) {
      throw errors.FORBIDDEN()
    }

    const updated = await prisma.link.update({
      where: { id: input.id },
      data: {
        url: input.url ?? link.url,
        label: input.label ?? link.label,
      }
    })

    return { id: updated.id }
  })

export const DeleteLink = os.Link.delete
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {

    const link = await prisma.link.findUnique({
      where: { id: input.id },
      include: { post: true }
    })

    if (!link) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Link", resourceId: input.id }
      })
    }

    if (link.post.authorId !== context.user.id) {
      throw errors.FORBIDDEN()
    }

    await prisma.link.delete({ where: { id: input.id } })

    return { id: input.id }
  })