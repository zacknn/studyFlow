import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "../orpc";

export function useListChat() {
  return useQuery(
    orpc.AI.listChats.queryOptions({ input: { page: 1, limit: 20 } }),
  );
}

export function useGetChat(id: string | null) {
  return useQuery({
    ...orpc.AI.getChat.queryOptions({
      input: { id: id! }
    }),
    enabled: !!id,   
  })
}


export function useDeleteChat() {
  const queryClient = useQueryClient()
  return useMutation(
    orpc.AI.deleteChat.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.AI.listChats.key()
        })
      }
    })
  )
}