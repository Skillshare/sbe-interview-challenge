export interface MemberState {
  readonly id: string
  readonly teamId: string
  readonly name: string
  readonly email: string
}

export class Member {
  private constructor(
    readonly id: string,
    readonly teamId: string,
    readonly name: string,
    readonly email: string,
  ) {}

  static fromState(state: MemberState): Member {
    return new Member(state.id, state.teamId, state.name, state.email)
  }

  toState(): MemberState {
    return { id: this.id, teamId: this.teamId, name: this.name, email: this.email }
  }
}
