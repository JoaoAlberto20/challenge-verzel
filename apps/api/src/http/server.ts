import Fastify from 'fastify'
import { env } from '@carhub/env'

const fastify = Fastify({
  logger: true,
})

fastify.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running!')
})