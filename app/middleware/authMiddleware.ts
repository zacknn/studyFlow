// src/middlewares/auth.middleware.ts
import { ORPCError } from '@orpc/server'
import { auth } from '../lib/auth' 
import { base } from '../../context'

export const authMiddleware = base.middleware(async ({ context, next }) => {
  const sessionData = await auth.api.getSession({
    headers: context.headers,
  })

  if (!sessionData?.session || !sessionData?.user) {
    throw new ORPCError('UNAUTHORIZED')
  }

  
  return next({
    context: {
      session: sessionData.session,
      user: sessionData.user,
    },
  })
})