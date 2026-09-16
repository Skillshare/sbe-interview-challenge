import type { Class } from '../entities/class'

/** Port. The domain never learns which database is underneath. */
export interface ClassRepository {
  findById(id: string): Promise<Class | null>
  save(subject: Class): Promise<void>
}

export const CLASS_REPOSITORY = Symbol('ClassRepository')
