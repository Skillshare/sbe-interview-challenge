import type { DomainEvent, DomainEventPublisher } from '@platform/foundation'

export class RecordingEventPublisher implements DomainEventPublisher {
  readonly published: DomainEvent[] = []

  async publish(event: DomainEvent): Promise<void> {
    this.published.push(event)
  }
}
