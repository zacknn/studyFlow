import { implement } from "@orpc/server";
import { contract } from "../contract";
import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/authMiddleware";


const os = implement(contract).$context<{ headers: Headers }>();

export const CreateFile = os.File.create
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {

    // check post exists and belongs to user
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

    const file = await prisma.file.create({
      data: {
        url: input.url,
        name: input.name,
        size: input.size,
        mimeType: input.mimeType,
        pages: input.pages,
        postId: input.postId,
      }
    })

    return { id: file.id }
  })

export const DeleteFile = os.File.delete
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {

    const file = await prisma.file.findUnique({
      where: { id: input.id },
      include: { post: true }  // need post to check ownership
    })

    if (!file) {
      throw errors.NOT_FOUND({
        data: { resourceType: "File", resourceId: input.id }
      })
    }

    if (file.post.authorId !== context.user.id) {
      throw errors.FORBIDDEN()
    }

    await prisma.file.delete({ where: { id: input.id } })

    return { id: input.id }
  })