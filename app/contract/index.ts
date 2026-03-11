// /contract/index.ts
import { CreatePostContract, DeletePostContract, GetPostByIdContract, ListPostsContract, UpdatePostContract } from "./post.contract";

export const contract = {
    Post : {
        create: CreatePostContract,
        update: UpdatePostContract,
        delete: DeletePostContract,
        getById: GetPostByIdContract,
        list: ListPostsContract,
    }
}