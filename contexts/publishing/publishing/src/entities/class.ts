import { ClassAlreadyPublishedError, ClassNeedsATitleError } from '../errors'
import { type ClassPublished, classPublished } from '../events/class-published'

export type ClassStatus = 'draft' | 'published'

export interface ClassState {
  readonly id: string
  readonly teacherId: string
  readonly title: string
  readonly status: ClassStatus
  readonly publishedAt: Date | null
}

/**
 * Aggregate root. Nothing outside this class may change a class's status,
 * so the rules for publishing live here and nowhere else.
 */
export class Class {
  private constructor(
    readonly id: string,
    readonly teacherId: string,
    private title_: string,
    private status_: ClassStatus,
    private publishedAt_: Date | null,
  ) {}

  static fromState(state: ClassState): Class {
    return new Class(state.id, state.teacherId, state.title, state.status, state.publishedAt)
  }

  static draft(id: string, teacherId: string, title: string): Class {
    return new Class(id, teacherId, title, 'draft', null)
  }

  get title(): string {
    return this.title_
  }

  get status(): ClassStatus {
    return this.status_
  }

  get publishedAt(): Date | null {
    return this.publishedAt_
  }

  publish(now: Date): ClassPublished {
    if (this.status_ === 'published') throw new ClassAlreadyPublishedError(this.id)
    if (this.title_.trim() === '') throw new ClassNeedsATitleError(this.id)

    this.status_ = 'published'
    this.publishedAt_ = now

    return classPublished(
      { classId: this.id, teacherId: this.teacherId, publishedAt: now.toISOString() },
      now,
    )
  }

  toState(): ClassState {
    return {
      id: this.id,
      teacherId: this.teacherId,
      title: this.title_,
      status: this.status_,
      publishedAt: this.publishedAt_,
    }
  }
}
