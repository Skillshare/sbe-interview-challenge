export class TeamNotFoundError extends Error {
  constructor(readonly teamId: string) {
    super(`Team ${teamId} was not found`)
    this.name = 'TeamNotFoundError'
  }
}
