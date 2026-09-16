import { Class, type ClassRepository, type ClassState } from '@platform/publishing'

/** The substrate unit tests run on. Same port, no database. */
export class InMemoryClassRepository implements ClassRepository {
  private readonly rows = new Map<string, ClassState>()

  constructor(seed: readonly ClassState[] = []) {
    for (const row of seed) this.rows.set(row.id, row)
  }

  async findById(id: string): Promise<Class | null> {
    const row = this.rows.get(id)
    return row === undefined ? null : Class.fromState(row)
  }

  async save(subject: Class): Promise<void> {
    this.rows.set(subject.id, subject.toState())
  }
}
