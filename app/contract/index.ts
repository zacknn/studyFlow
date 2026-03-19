import {
  CreatePostContract,
  DeletePostContract,
  GetPostByIdContract,
  ListPostsContract,
  UpdatePostContract,
  IncrementLikesContract,
  IncrementViewContract
} from "./post.contract";
import { CreateFileContract, DeleteFileContract } from "./file.contract";
import {
  CreateLinkContract,
  DeleteLinkContract,
  UpdateLinkContract,
} from "./link.contract";



export const contract = {
  Post: {
    create: CreatePostContract,
    update: UpdatePostContract,
    delete: DeletePostContract,
    getById: GetPostByIdContract,
    list: ListPostsContract,
    like: IncrementLikesContract,
    view: IncrementViewContract,
  },
  File: {
    create: CreateFileContract,
    delete: DeleteFileContract,
  },
  Link: {
    create : CreateLinkContract,
    update: UpdateLinkContract,
    delete: DeleteLinkContract,
  }
};
