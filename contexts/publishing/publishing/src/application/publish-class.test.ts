import { describe, expect, it } from 'bun:test'
import {
  InMemoryClassRepository,
  InMemoryUnitOfWork,
  RecordingEventPublisher,
} from '@platform/publishing-in-memory'
import { ClassNotFoundError } from '../errors'
import { PublishClass } from './publish-class'

const now = new Date('2026-09-01T10:00:00.000Z')

const setup = () => {
  const uow = new InMemoryUnitOfWork()
  const classes = new InMemoryClassRepository([
    { id: 'class-1', teacherId: 'teacher-1', title: 'Hand Lettering', status: 'draft', publishedAt: null },
  ])
  const publisher = new RecordingEventPublisher()
  return { uow, classes, publisher, useCase: new PublishClass(uow, classes, publisher, () => now) }
}

describe('PublishClass', () => {
  it('publishes the class and announces it', async () => {
    const { classes, publisher, useCase } = setup()

    const state = await useCase.execute({ classId: 'class-1' })

    expect(state.status).toBe('published')
    expect((await classes.findById('class-1'))?.status).toBe('published')
    expect(publisher.published.map((event) => event.name)).toEqual(['Class-Published'])
  })

  it('rolls back and says nothing when the class does not exist', async () => {
    const { uow, publisher, useCase } = setup()

    await expect(useCase.execute({ classId: 'nope' })).rejects.toThrow(ClassNotFoundError)
    expect(uow.calls).toEqual(['begin', 'rollback'])
    expect(publisher.published).toEqual([])
  })
})
