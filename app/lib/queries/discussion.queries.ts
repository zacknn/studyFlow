import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { orpc } from "../orpc"

export function useListDiscussions(input?: {
  page?: number
  limit?: number
  tag?: string
  search?: string
}) {
  return useQuery(
    orpc.Discussion.list.queryOptions({
      input: { page: 1, limit: 20, ...input }
    })
  )
}

export function useGetDiscussion(id: string) {
  return useQuery(
    orpc.Discussion.getById.queryOptions({
      input: { id }
    })
  )
}

export function useCreateDiscussion() {
  const queryClient = useQueryClient()
  return useMutation(
    orpc.Discussion.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.Discussion.list.key()
        })
      }
    })
  )
}

export function useDeleteDiscussion() {
  const queryClient = useQueryClient()
  return useMutation(
    orpc.Discussion.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.Discussion.list.key()
        })
      }
    })
  )
}

export function useCreateComment() {
  const queryClient = useQueryClient()
  return useMutation(
    orpc.Comment.create.mutationOptions({
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: orpc.Discussion.getById.key({
            input: { id: variables.discussionId }
          })
        })
      }
    })
  )
}

export function useDeleteComment(discussionId?: string) {
  const queryClient = useQueryClient()
  return useMutation(
    orpc.Comment.delete.mutationOptions({
      onSuccess: () => {
        if (discussionId) {
          queryClient.invalidateQueries({
            queryKey: orpc.Discussion.getById.key({
              input: { id: discussionId }
            })
          })
        }
        // Also invalidate the list cache
        queryClient.invalidateQueries({
          queryKey: orpc.Discussion.list.key()
        })
      }
    })
  )
}