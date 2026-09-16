import { activeClient, type PrismaClient } from '@platform/persistence'
import { Class, type ClassRepository, type ClassStatus } from '@platform/publishing'

/** Adapter. Maps rows to aggregates and back; the domain never sees Prisma. */
export class PrismaClassRepository implements ClassRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Class | null> {
    const row = await activeClient(this.prisma).class.findUnique({ where: { id } })
    if (row === null) return null

    return Class.fromState({
      id: row.id,
      teacherId: row.teacherId,
      title: row.title,
      status: row.status as ClassStatus,
      publishedAt: row.publishedAt,
    })
  }

  async save(subject: Class): Promise<void> {
    const state = subject.toState()
    await activeClient(this.prisma).class.update({
      where: { id: state.id },
      data: { title: state.title, status: state.status, publishedAt: state.publishedAt },
    })
  }
}
