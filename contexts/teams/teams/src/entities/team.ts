import { Member, type MemberState } from './member'

export interface TeamState {
  readonly id: string
  readonly name: string
  /** Which plan the team is on. Billing itself lives with the provider. */
  readonly planCode: string
  readonly members: readonly MemberState[]
}

/** Aggregate root for a team and the people in it. */
export class Team {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly planCode: string,
    private readonly members_: Member[],
  ) {}

  static fromState(state: TeamState): Team {
    return new Team(state.id, state.name, state.planCode, state.members.map(Member.fromState))
  }

  get members(): readonly Member[] {
    return this.members_
  }

  hasMember(memberId: string): boolean {
    return this.members_.some((member) => member.id === memberId)
  }

  toState(): TeamState {
    return {
      id: this.id,
      name: this.name,
      planCode: this.planCode,
      members: this.members_.map((member) => member.toState()),
    }
  }
}
