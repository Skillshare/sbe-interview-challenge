import type { DomainEventPublisher, UnitOfWork } from '@platform/foundation'
import type { ClassState } from '../entities/class'
import { ClassNotFoundError } from '../errors'
import type { ClassRepository } from '../ports/class-repository'

export interface PublishClassInput {
  readonly classId: string
}

export type Clock = () => Date

/**
 * Use case. It owns the transaction boundary: everything the aggregate
 * changes is written inside one unit of work.
 */
export class PublishClass {
  constructor(
    private readonly uow: UnitOfWork,
    private readonly classes: ClassRepository,
    private readonly publisher: DomainEventPublisher,
    private readonly now: Clock = () => new Date(),
  ) {}

  async execute(input: PublishClassInput): Promise<ClassState> {
    const { state, event } = await this.uow.run(async () => {
      const subject = await this.classes.findById(input.classId)
      if (subject === null) throw new ClassNotFoundError(input.classId)

      const published = subject.publish(this.now())
      await this.classes.save(subject)

      return { state: subject.toState(), event: published }
    })

    // Tell the rest of the platform once the class is safely stored.
    await this.publisher.publish(event)

    return state
  }
}
