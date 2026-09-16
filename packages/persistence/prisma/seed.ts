import { classSeed, teamSeed } from '@platform/seed-data'
import { createPrismaClient } from '../src/prisma-client'

// Bun loads .env by itself.
const url = process.env.DATABASE_URL
if (url === undefined) throw new Error('DATABASE_URL is not set — copy .env.example to .env')

const prisma = createPrismaClient(url)

async function seed(): Promise<void> {
  await prisma.member.deleteMany()
  await prisma.team.deleteMany()
  await prisma.class.deleteMany()

  for (const team of teamSeed) {
    await prisma.team.create({
      data: {
        id: team.id,
        name: team.name,
        planCode: team.planCode,
        members: { create: team.members.map(({ id, name, email }) => ({ id, name, email })) },
      },
    })
  }

  await prisma.class.createMany({ data: classSeed.map((row) => ({ ...row })) })

  console.log(`seeded ${teamSeed.length} teams and ${classSeed.length} classes`)
  await prisma.$disconnect()
}

void seed()
