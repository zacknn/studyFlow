import { implement } from "@orpc/server";
import { contract } from "../contract";
import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/authMiddleware";

const os = implement(contract).$context<{ headers: Headers }>();

const authorSelect = {
  select: {
    id: true,
    name: true,
    image: true,
  }
}

export const CreateDiscussion = os.Discussion.create
  .use(authMiddleware)
  .handler(async ({ input, context }) => {
    const discussion = await prisma.discussion.create({
      data: {
        title: input.title,
        content: input.content,
        tags: input.tags ?? [],
        authorId: context.user.id,
      }
    })
    return { id: discussion.id }
  })

export const ListDiscussions = os.Discussion.list
  .handler(async ({ input }) => {
    const { page, limit, tag, authorId, search } = input

    const where = {
      ...(tag ? { tags: { has: tag } } : {}),
      ...(authorId ? { authorId } : {}),
      ...(search ? {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { content: { contains: search, mode: "insensitive" as const } },
        ]
      } : {}),
    }

    const [discussions, total] = await prisma.$transaction([
      prisma.discussion.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          author: authorSelect,
          _count: { select: { comments: true } }  // ← just count, not full comments
        }
      }),
      prisma.discussion.count({ where })
    ])

    return {
      data: discussions.map(d => ({
        id: d.id,
        title: d.title,
        content: d.content,
        tags: d.tags,
        authorId: d.authorId,
        author: d.author,
        commentCount: d._count.comments,  // ← flat count for the list
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      })),
      total,
      page,
      limit,
    }
  })

export const GetDiscussionById = os.Discussion.getById
  .handler(async ({ input, errors }) => {
    const discussion = await prisma.discussion.findUnique({
      where: { id: input.id },
      include: {
        author: authorSelect,
        comments: {
          orderBy: { createdAt: "asc" },  // oldest first like Reddit
          include: { author: authorSelect }
        }
      }
    })

    if (!discussion) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Discussion", resourceId: input.id }
      })
    }

    return discussion
  })

export const UpdateDiscussion = os.Discussion.update
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {
    const discussion = await prisma.discussion.findUnique({
      where: { id: input.id }
    })

    if (!discussion) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Discussion", resourceId: input.id }
      })
    }

    if (discussion.authorId !== context.user.id) {
      throw errors.FORBIDDEN()
    }

    const updated = await prisma.discussion.update({
      where: { id: input.id },
      data: {
        title: input.title ?? discussion.title,
        content: input.content ?? discussion.content,
        tags: input.tags ?? discussion.tags,
      }
    })

    return { id: updated.id }
  })

export const DeleteDiscussion = os.Discussion.delete
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {
    const discussion = await prisma.discussion.findUnique({
      where: { id: input.id }
    })

    if (!discussion) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Discussion", resourceId: input.id }
      })
    }

    if (discussion.authorId !== context.user.id) {
      throw errors.FORBIDDEN()
    }

    await prisma.discussion.delete({ where: { id: input.id } })

    return { id: input.id }
  })