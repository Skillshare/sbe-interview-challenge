import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client'

export type { PrismaClient }

/** The transaction-scoped client a repository must use while a unit of work is open. */
export type PrismaTransaction = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0]

export const createPrismaClient = (connectionString: string): PrismaClient =>
  new PrismaClient({ adapter: new PrismaPg({ connectionString }) })
