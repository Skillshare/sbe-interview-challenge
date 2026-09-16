import { Logger } from '@nestjs/common'
import type { DomainEvent, DomainEventPublisher } from '@platform/foundation'

/** Adapter. In production this would hand the event to the broker. */
export class ConsoleEventPublisher implements DomainEventPublisher {
  private readonly logger = new Logger('DomainEvents')

  async publish(event: DomainEvent): Promise<void> {
    this.logger.log(`${event.name} ${JSON.stringify(event.payload)}`)
  }
}
