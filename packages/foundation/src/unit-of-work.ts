/**
 * Port for a transaction. A use case owns its transaction boundary:
 * everything inside `run` commits together or not at all.
 */
export interface UnitOfWork {
  run<T>(work: () => Promise<T>): Promise<T>
}

export const UNIT_OF_WORK = Symbol('UnitOfWork')
