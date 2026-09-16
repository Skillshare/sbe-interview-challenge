import type { DomainEvent } from '@platform/foundation'

export interface ClassPublishedPayload {
  readonly classId: string
  readonly teacherId: string
  readonly publishedAt: string
}

export type ClassPublished = DomainEvent<ClassPublishedPayload>

export const classPublished = (payload: ClassPublishedPayload, occurredAt: Date): ClassPublished => ({
  name: 'Class-Published',
  occurredAt,
  payload,
})
