export class ClassNotFoundError extends Error {
  constructor(readonly classId: string) {
    super(`Class ${classId} was not found`)
    this.name = 'ClassNotFoundError'
  }
}

export class ClassAlreadyPublishedError extends Error {
  constructor(readonly classId: string) {
    super(`Class ${classId} is already published`)
    this.name = 'ClassAlreadyPublishedError'
  }
}

export class ClassNeedsATitleError extends Error {
  constructor(readonly classId: string) {
    super(`Class ${classId} cannot be published without a title`)
    this.name = 'ClassNeedsATitleError'
  }
}
