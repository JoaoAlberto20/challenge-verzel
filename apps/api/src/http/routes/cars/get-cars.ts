import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function getCars(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/cars',
    {
      schema: {
        tags: ['Cars'],
        summary: 'Get all Cars',
        response: {
          200: z.object({
            cars: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                brand: z.string(),
                slug: z.string(),
                imageUrl: z.string(),
                model: z.string(),
                year: z.number(),
                location: z.string(),
                mileage: z.number(),
                originalValue: z.string(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const cars = await prisma.car.findMany()

      reply.status(200).send({ cars })
    },
  )
}
