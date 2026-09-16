import { Global, Module } from '@nestjs/common'
import {
  DOMAIN_EVENT_PUBLISHER,
  type DomainEventPublisher,
  UNIT_OF_WORK,
  type UnitOfWork,
} from '@platform/foundation'
import { createPrismaClient, type PrismaClient, PrismaUnitOfWork } from '@platform/persistence'
import { CLASS_REPOSITORY, type ClassRepository, PublishClass } from '@platform/publishing'
import { InMemoryClassRepository, InMemoryUnitOfWork } from '@platform/publishing-in-memory'
import { PrismaClassRepository } from '@platform/publishing-prisma-postgres'
import { classSeed, teamSeed } from '@platform/seed-data'
import { TEAM_REPOSITORY } from '@platform/teams'
import { InMemoryTeamRepository } from '@platform/teams-in-memory'
import { PrismaTeamRepository } from '@platform/teams-prisma-postgres'
import { ConsoleEventPublisher } from './console-event-publisher'

const PRISMA = Symbol('PrismaClient')

/** `ADAPTER=postgres` swaps every port onto Postgres. Anything else stays in memory. */
const onPostgres = process.env.ADAPTER === 'postgres'

const prismaOrNull = (): PrismaClient | null => {
  if (!onPostgres) return null

  const url = process.env.DATABASE_URL
  if (url === undefined) throw new Error('ADAPTER=postgres needs DATABASE_URL — see .env.example')
  return createPrismaClient(url)
}

/**
 * The only place that knows which adapter is plugged into which port.
 * Swap the providers here and nothing above the ports changes.
 */
@Global()
@Module({
  providers: [
    { provide: PRISMA, useFactory: prismaOrNull },
    {
      provide: TEAM_REPOSITORY,
      inject: [PRISMA],
      useFactory: (prisma: PrismaClient | null) =>
        prisma === null ? new InMemoryTeamRepository(teamSeed) : new PrismaTeamRepository(prisma),
    },
    {
      provide: CLASS_REPOSITORY,
      inject: [PRISMA],
      useFactory: (prisma: PrismaClient | null) =>
        prisma === null ? new InMemoryClassRepository(classSeed) : new PrismaClassRepository(prisma),
    },
    {
      provide: UNIT_OF_WORK,
      inject: [PRISMA],
      useFactory: (prisma: PrismaClient | null) =>
        prisma === null ? new InMemoryUnitOfWork() : new PrismaUnitOfWork(prisma),
    },
    { provide: DOMAIN_EVENT_PUBLISHER, useFactory: () => new ConsoleEventPublisher() },
    {
      provide: PublishClass,
      inject: [UNIT_OF_WORK, CLASS_REPOSITORY, DOMAIN_EVENT_PUBLISHER],
      useFactory: (uow: UnitOfWork, classes: ClassRepository, publisher: DomainEventPublisher) =>
        new PublishClass(uow, classes, publisher),
    },
  ],
  exports: [TEAM_REPOSITORY, CLASS_REPOSITORY, UNIT_OF_WORK, DOMAIN_EVENT_PUBLISHER, PublishClass],
})
export class CompositionModule {}
