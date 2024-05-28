import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getCar(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/cars/:carSlug',
      {
        schema: {
          tags: ['Cars'],
          summary: 'Get Car Details',
          security: [{ bearerAuth: [] }],
          params: z.object({
            carSlug: z.string(),
          }),
          response: {
            200: z.object({
              car: z.object({
                id: z.string(),
                name: z.string(),
                description: z.string(),
                brand: z.string(),
                slug: z.string(),
                image_url: z.string(),
                model: z.string(),
                year: z.number(),
                location: z.string(),
                mileage: z.number(),
                original_value: z.string(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        await request.getUserAdmin()
        const { carSlug } = request.params

        console.log(carSlug)

        const car = await prisma.car.findUnique({
          where: {
            slug: carSlug,
          },
        })

        if (!car) {
          throw new BadRequestError('Car not found')
        }
        reply.status(200).send({ car })
      },
    )
}
