import { implement } from "@orpc/server";
import { contract } from "../contract";
import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/authMiddleware";
import { error } from "console";

const os = implement(contract).$context<{ headers: Headers }>();

export const CreatePost = os.Post.create
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {
    const existingPost = await prisma.post.findFirst({
      where: {
        title: input.title,
      },
      select: {
        id: true,
      },
    });
    const authorId = context.user.id;
    if (existingPost) {
      throw errors.CONFLICT({
        data: {
          field: "title",
          value: input.title,
        },
        cause: "a post with this title already exists",
      });
    }

    const data = await prisma.post.create({
      data: {
        ...input,
        authorId,
        isPublic: input.isPublic ?? true,
      },
    });
    return data;
  });

export const UpdatePost = os.Post.update
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {
    const post = await prisma.post.findUnique({
      where: {
        id: input.id,
      },
    });
    if (!post) {
      throw errors.NOT_FOUND({
        data: {
          resourceType: "Post",
          resourceId: input.id,
        },
      });
    }

    if (post.authorId !== context.user.id) {
      throw errors.FORBIDDEN();
    }

    const updated = await prisma.post.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
    });
    return updated;
  });

export const DeletePost = os.Post.delete
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {
    const post = await prisma.post.findUnique({
      where: {
        id: input.id,
      },
    });
    if (!post) {
      throw errors.NOT_FOUND({
        data: {
          resourceType: "Post",
          resourceId: input.id,
        },
      });
    }

    if (post.authorId !== context.user.id) {
      throw errors.FORBIDDEN();
    }

    const deleted = await prisma.post.delete({
      where: {
        id: input.id,
      },
    });
    return deleted;
  });

export const GetPostById = os.Post.getById
  .use(authMiddleware)
  .handler(async ({ input, errors }) => {
    const post = await prisma.post.findUnique({
      where: {
        id: input.id,
      },
      include: {
        files: true,
        links: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    if (!post) {
      throw errors.NOT_FOUND({
        data: {
          resourceType: "Post",
          resourceId: input.id,
        },
      });
    }
    return post;
  });

export const ListPosts = os.Post.list.handler(async ({ input }) => {
  const { page, limit, type, tag, isPublic } = input

  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({
      where: {
        isPublic,
        type,
        tags: tag ? { has: tag } : undefined,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { files: true, links: true },
    }),
    prisma.post.count({
      where: {
        isPublic,
        type,
      },
    }),
  ])

  return { data: posts, total, page, limit }
})
