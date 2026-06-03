import {
  CreatePostContract,
  DeletePostContract,
  GetPostByIdContract,
  ListPostsContract,
  UpdatePostContract,
  IncrementLikesContract,
  IncrementViewContract,
} from "./post.contract";
import { CreateFileContract, DeleteFileContract } from "./file.contract";
import {
  CreateLinkContract,
  DeleteLinkContract,
  UpdateLinkContract,
} from "./link.contract";
import {
  ListChatsContract,
  GetChatContract,
  DeleteChatContract,
} from "./ai.contract";
import {
  CreateDiscussionContract,
  ListDiscussionsContract,
  GetDiscussionByIdContract,
  UpdateDiscussionContract,
  DeleteDiscussionContract,
} from "./discussion.contract";

import {
  CreateCommentContract,
  UpdateCommentContract,
  DeleteCommentContract,
} from "./comment.contract";

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
    create: CreateLinkContract,
    update: UpdateLinkContract,
    delete: DeleteLinkContract,
  },
  AI: {
    listChats: ListChatsContract,
    getChat : GetChatContract,
    deleteChat: DeleteChatContract,
  },
  Discussion: {
    create: CreateDiscussionContract,
    list: ListDiscussionsContract,
    getById: GetDiscussionByIdContract,
    update: UpdateDiscussionContract,
    delete: DeleteDiscussionContract,
  },
  Comment: {
    create: CreateCommentContract,
    update: UpdateCommentContract,
    delete: DeleteCommentContract,
  },  
};
