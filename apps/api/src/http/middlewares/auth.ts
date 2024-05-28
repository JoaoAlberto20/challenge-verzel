import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch {
        throw new UnauthorizedError('Invalid token')
      }
    }

    request.getUserAdmin = async () => {
      const id = await request.getCurrentUserId()

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        throw new UnauthorizedError(`You're not permissions.`)
      }

      if (user.role !== 'ADMIN') {
        throw new UnauthorizedError(`You're not permissions.`)
      }
    }
  })
})
