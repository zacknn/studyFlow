import { OpenAPIHandler } from '@orpc/openapi/fetch'
import { RPCHandler } from '@orpc/server/fetch'        
import { CORSPlugin } from '@orpc/server/plugins'
import { onError } from '@orpc/server'
import { router } from '@/app/router'

const openAPIHandler = new OpenAPIHandler(router, {
  plugins: [new CORSPlugin()],
  interceptors: [
    onError((error) => console.error(error)),
  ],
})

const rpcHandler = new RPCHandler(router, {           
  plugins: [new CORSPlugin()],
  interceptors: [
    onError((error) => console.error(error)),
  ],
})

async function handleRequest(request: Request) {
  
  const rpcResult = await rpcHandler.handle(request, {
    prefix: '/api',
    context: {
      headers: request.headers,
    },
  })

  if (rpcResult.matched) {
    return rpcResult.response
  }

 
  const openAPIResult = await openAPIHandler.handle(request, {
    prefix: '/api',
    context: {
      headers: request.headers,
    },
  })

  if (openAPIResult.matched) {
    return openAPIResult.response
  }

  return new Response('Not Found', { status: 404 })
}

export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest