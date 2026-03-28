import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "../orpc";

//queries

export function useListPosts(input?: {
  page?: number;
  limit?: number;
  tag?: string;
  isPublic?: boolean;
  search?: string;
  category?: string;
}) {
  return useQuery(
    orpc.Post.list.queryOptions({
      input: { page: 1, limit: 12, ...input },
    }),
  );
}

export function useGetPost(id: string) {
  return useQuery(
    orpc.Post.getById.queryOptions({
      input: { id },
    }),
  );
}

//mutations

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.Post.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: orpc.Post.list.key() });
      },
    }),
  );
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.Post.update.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: orpc.Post.list.key() });
        queryClient.invalidateQueries({
          queryKey: orpc.Post.getById.key({ input: { id: data.id } }),
        });
      },
    }),
  );
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.Post.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: orpc.Post.list.key() });
      },
    }),
  );
}

export function useCreateFile() {
  const queryClient = useQueryClient();
  return useMutation(
    orpc.File.create.mutationOptions({
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: orpc.Post.getById.key({ input: { id: variables.postId } }),
        });
      },
    }),
  );
}

export function useCreateLink() {
  const queryClient = useQueryClient();
  return useMutation(
    orpc.Link.create.mutationOptions({
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: orpc.Post.getById.key({ input: { id: variables.postId } }),
        });
      },
    }),
  );
}

export function useIncrementLikes() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.Post.like.mutationOptions({
      onSuccess: (_, variables) => {
        // update the single post cache
        queryClient.invalidateQueries({
          queryKey: orpc.Post.getById.key({ input: { id: variables.id } }),
        });
        // update the list cache too (likes show on cards)
        queryClient.invalidateQueries({
          queryKey: orpc.Post.list.key(),
        });
      },
    }),
  );
}

export function useIncrementViews() {
  return useMutation(
    orpc.Post.view.mutationOptions(),
    // no cache invalidation needed —
    // views are just a counter, no need to refetch the whole list
  );
}
