import { implement } from "@orpc/server";
import { contract } from "../contract";
import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/authMiddleware";

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

    const { id, ...bodyFields } = input;
    const updated = await prisma.post.update({
      where: {
        id,
      },
      data: bodyFields,
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
    return updated;
  });

export const DeletePost = os.Post.delete
  .use(authMiddleware)
  .handler(async ({ input, context, errors }) => {
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

    if (post.authorId !== context.user.id) {
      throw errors.FORBIDDEN();
    }

    await prisma.post.delete({
      where: {
        id: input.id,
      },
    });
    return post;
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
  const { page = 1, limit = 12, search, type, tag, isPublic, authorId } = input;
  const where: any = {};

  if (isPublic !== undefined) {
    where.isPublic = isPublic;
  }

  if (authorId) {
    where.authorId = authorId;
  }

  if (type) {
    where.type = type;
  }

  if (search && search.length > 0) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (tag && tag.length > 0) {
    where.tags = {
      has: tag,
    };
  }

  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
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
    }),
    prisma.post.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: posts,
    total,
    page,
    limit,
    totalPages,
  };
});

export const IncrementLikes = os.Post.like.handler(
  async ({ input, errors }) => {
    const post = await prisma.post.findUnique({
      where: { id: input.id },
    });

    if (!post) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Post", resourceId: input.id },
      });
    }

    const updated = await prisma.post.update({
      where: { id: input.id },
      data: { likes: { increment: 1 } },
    });

    return { id: updated.id };
  },
);

export const IncrementViews = os.Post.view.handler(
  async ({ input, errors }) => {
    const post = await prisma.post.findUnique({
      where: { id: input.id },
    });

    if (!post) {
      throw errors.NOT_FOUND({
        data: { resourceType: "Post", resourceId: input.id },
      });
    }

    const updated = await prisma.post.update({
      where: { id: input.id },
      data: { views: { increment: 1 } },
    });

    return { id: updated.id };
  },
);
