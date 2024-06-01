import { createSlug } from "@/utils/create-slug"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async  function seed() {

  const passwordHash = await hash('123456', 1)

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@acme.com',
      password: passwordHash,
      role: 'ADMIN',
    },
  })


  await prisma.car.createMany({
    data: [
      {
        name: 'Toyota Corolla',
        brand: 'Toyota',
        model: 'Corolla',
        slug: createSlug('Toyota Corolla'),
        imageUrl: 'https://www.toyota.com.br/imagens/veiculos/corolla/2022/grade/grade-corolla-2022-01.jpg',
        year: 2021,
        location: 'São Paulo',
        mileage: 10000,
        originalValue: "10000",
      },
      {
        name: 'Honda Civic',
        brand: 'Honda',
        model: 'Civic',
        slug: createSlug('Honda Civic'),
        imageUrl: 'https://www.honda.com.br/automoveis/sites/hab/files/2021-04/2021_civic_sedan_1.jpg',
        year: 2022,
        location: 'Rio de Janeiro',
        mileage: 5000,
        originalValue: "12000",
      },
      {
        name: 'Chevrolet Onix',
        brand: 'Chevrolet',
        model: 'Onix',
        slug: createSlug('Chevrolet Onix'),
        imageUrl: 'https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/2022-onix/01-images/2022-chevrolet-onix-01.jpg',
        year: 2020,
        location: 'Minas Gerais',
        mileage: 20000,
        originalValue: "80000",
      },
    ],
  })
}

seed().then(() => {
  console.log('Database seeded!')
})