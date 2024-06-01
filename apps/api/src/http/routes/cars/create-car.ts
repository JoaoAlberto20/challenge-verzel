import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'

import { BadRequestError } from '../_errors/bad-request-error'

export async function createCar(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/cars',
      {
        schema: {
          tags: ['Cars'],
          summary: 'Create a new car',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            imageUrl: z.string(),
            brand: z.string(),
            model: z.string(),
            year: z.number(),
            location: z.string(),
            mileage: z.number(),
            originalValue: z.string(),
          }),
        },
      },
      async (request, reply) => {
        await request.getUserAdmin()
        const {
          name,
          brand,
          model,
          imageUrl,
          year,
          location,
          mileage,
          originalValue,
        } = request.body

        const slug = createSlug(name)

        const slugAlreadyExits = await prisma.car.findUnique({
          where: {
            slug,
          }
        })

        if (slugAlreadyExits) {
          throw new BadRequestError('Car Already Exits!')
        }

        await prisma.car.create({
          data: {
            name,
            brand,
            imageUrl,
            slug,
            model,
            year,
            location,
            mileage,
            originalValue: originalValue,
          },
        })

        reply.status(201).send()
      },
    )
}
