import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orpc } from '../orpc';


//queries

export function useListPosts(input?: { page?: number; limit?: number; tag?: string; isPublic?: boolean }) {
  return useQuery(
    orpc.Post.list.queryOptions({
      input: { page: 1, limit: 10, ...input }
    })
  )
}


export function useGetPost(id: string) {
  return useQuery(
    orpc.Post.getById.queryOptions({
      input: { id }
    })
  )
}

//mutations

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation(
    orpc.Post.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: orpc.Post.list.key() })
      }
    })
  )
}

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation(
    orpc.Post.update.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: orpc.Post.list.key() })
        queryClient.invalidateQueries({ queryKey: orpc.Post.getById.key({ input: { id: data.id } }) })
      }
    })
  )
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation(
    orpc.Post.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: orpc.Post.list.key() })
      }
    })
  )
}
