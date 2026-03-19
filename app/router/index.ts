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
import { CreateFile , DeleteFile } from "./file";
import { CreateLink , UpdateLink , DeleteLink } from "./link";
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
  }
});
