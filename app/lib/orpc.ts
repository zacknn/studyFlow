import { RPCLink } from '@orpc/client/fetch';
import { createORPCReactQueryUtils } from '@orpc/react-query';
import type { contract } from '../contract';
import { ContractRouterClient } from '@orpc/contract';
import { createORPCClient } from '@orpc/client';

const link = new RPCLink({
    url: `${process.env.NEXT_PUBLIC_APP_URL}`
})

const client: ContractRouterClient<typeof contract> = createORPCClient(link);

export const orpc = createORPCReactQueryUtils(client);

