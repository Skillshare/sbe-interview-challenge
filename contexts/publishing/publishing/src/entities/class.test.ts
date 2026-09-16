import { describe, expect, it } from 'bun:test'
import { ClassAlreadyPublishedError, ClassNeedsATitleError } from '../errors'
import { Class } from './class'

const now = new Date('2026-09-01T10:00:00.000Z')

describe('Class', () => {
  it('publishes a draft and reports the fact', () => {
    const subject = Class.draft('class-1', 'teacher-1', 'Hand Lettering')

    const event = subject.publish(now)

    expect(subject.status).toBe('published')
    expect(subject.publishedAt).toEqual(now)
    expect(event.name).toBe('Class-Published')
    expect(event.payload.classId).toBe('class-1')
  })

  it('refuses to publish twice', () => {
    const subject = Class.draft('class-1', 'teacher-1', 'Hand Lettering')
    subject.publish(now)

    expect(() => subject.publish(now)).toThrow(ClassAlreadyPublishedError)
  })

  it('refuses to publish without a title', () => {
    const subject = Class.draft('class-1', 'teacher-1', '   ')

    expect(() => subject.publish(now)).toThrow(ClassNeedsATitleError)
  })
})
