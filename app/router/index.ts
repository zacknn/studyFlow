import { implement } from "@orpc/server";
import { contract } from "../contract";
import { CreatePost, DeletePost, GetPostById, ListPosts, UpdatePost } from "./post";


const os = implement(contract).$context<{ headers: Headers }>();

export const router = os.router({
    Post: {
        create: CreatePost,
        delete: DeletePost,
        update: UpdatePost,
        getById: GetPostById,
        list: ListPosts,
    }
})