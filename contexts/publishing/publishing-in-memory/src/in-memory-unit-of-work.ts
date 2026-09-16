import type { UnitOfWork } from '@platform/foundation'

export class InMemoryUnitOfWork implements UnitOfWork {
  readonly calls: string[] = []

  async run<T>(work: () => Promise<T>): Promise<T> {
    this.calls.push('begin')
    try {
      const result = await work()
      this.calls.push('commit')
      return result
    } catch (error) {
      this.calls.push('rollback')
      throw error
    }
  }
}
