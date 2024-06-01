import { env } from '@carhub/env'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './middlewares/error-handler'
import { authenticateWithPassword } from './routes/auth/authenticate'
import { createAccount } from './routes/auth/create-account'
import { createCar } from './routes/cars/create-car'
import { deleteCar } from './routes/cars/delete-car'
import { getCar } from './routes/cars/get-car'
import { getCars } from './routes/cars/get-cars'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Desafio Venda de Carros API',
      description: 'API para o desafio de venda de carros',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
})

app.register(createAccount)
app.register(authenticateWithPassword)

app.register(createCar)
app.register(getCar)
app.register(getCars)
app.register(deleteCar)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running!')
})
