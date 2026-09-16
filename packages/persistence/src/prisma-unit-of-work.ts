import { AsyncLocalStorage } from 'node:async_hooks'
import type { UnitOfWork } from '@platform/foundation'
import type { PrismaClient, PrismaTransaction } from './prisma-client'

const storage = new AsyncLocalStorage<PrismaTransaction>()

/**
 * Postgres unit of work. Everything a use case does inside `run` happens
 * on one transaction; repositories pick it up through `activeClient`.
 */
export class PrismaUnitOfWork implements UnitOfWork {
  constructor(private readonly prisma: PrismaClient) {}

  async run<T>(work: () => Promise<T>): Promise<T> {
    const running = storage.getStore()
    if (running !== undefined) return work()

    return this.prisma.$transaction((tx) => storage.run(tx, work))
  }
}

/** The transaction if one is open, otherwise the plain client. */
export const activeClient = (prisma: PrismaClient): PrismaClient | PrismaTransaction =>
  storage.getStore() ?? prisma
