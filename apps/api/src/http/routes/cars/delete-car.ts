import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function deleteCar(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/cars/:idCar',
      {
        schema: {
          tags: ['Cars'],
          summary: 'Delete a car',
          security: [{ bearerAuth: [] }],
          params: z.object({
            idCar: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        await request.getUserAdmin()
        const { idCar } = request.params

        const car = await prisma.car.findUnique({
          where: {
            id: idCar,
          },
        })

        if (!car) {
          throw new BadRequestError('Car not found!')
        }

        await prisma.car.delete({
          where: {
            id: idCar,
          },
        })

        reply.status(204).send()
      },
    )
}
