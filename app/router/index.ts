import { implement } from "@orpc/server";
import { contract } from "../contract";
import {
  CreatePost,
  DeletePost,
  GetPostById,
  ListPosts,
  UpdatePost,
  IncrementLikes,
  IncrementViews,
} from "./post";
import { CreateFile, DeleteFile } from "./file";
import { CreateLink, UpdateLink, DeleteLink } from "./link";
import { ListChats, DeleteChat, GetChat } from "./ai";
import {
  CreateDiscussion,
  ListDiscussions,
  GetDiscussionById,
  UpdateDiscussion,
  DeleteDiscussion,
} from "./discussion";
import { CreateComment, UpdateComment, DeleteComment } from "./comment";

const os = implement(contract).$context<{ headers: Headers }>();

export const router = os.router({
  Post: {
    create: CreatePost,
    delete: DeletePost,
    update: UpdatePost,
    getById: GetPostById,
    list: ListPosts,
    like: IncrementLikes,
    view: IncrementViews,
  },
  File: {
    create: CreateFile,
    delete: DeleteFile,
  },
  Link: {
    create: CreateLink,
    delete: DeleteLink,
    update: UpdateLink,
  },
  AI: {
    listChats: ListChats,
    getChat: GetChat,
    deleteChat: DeleteChat,
  },
  Discussion: {
    create: CreateDiscussion,
    list: ListDiscussions,
    getById: GetDiscussionById,
    update: UpdateDiscussion,
    delete: DeleteDiscussion,
  },
  Comment: {
    create: CreateComment,
    update: UpdateComment,
    delete: DeleteComment,
  }
});
