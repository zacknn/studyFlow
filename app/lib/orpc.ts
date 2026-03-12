import { RPCLink } from '@orpc/client/fetch'
import { createORPCReactQueryUtils } from '@orpc/react-query'
import { ContractRouterClient } from '@orpc/contract'
import { createORPCClient } from '@orpc/client'
import type { contract } from '../contract'

const link = new RPCLink({
 
  url: typeof window === 'undefined'
    ? 'http://localhost:3000/api'      
    : `${window.location.origin}/api`  
})

const client: ContractRouterClient<typeof contract> = createORPCClient(link)
export const orpc = createORPCReactQueryUtils(client)
