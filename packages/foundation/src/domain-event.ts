/**
 * A fact that has already happened inside a bounded context.
 * Events are named in the past tense and carry only what a consumer needs.
 */
export interface DomainEvent<TPayload = unknown> {
  readonly name: string
  readonly occurredAt: Date
  readonly payload: TPayload
}

/** Port. Adapters decide where events actually go. */
export interface DomainEventPublisher {
  publish(event: DomainEvent): Promise<void>
}

export const DOMAIN_EVENT_PUBLISHER = Symbol('DomainEventPublisher')
