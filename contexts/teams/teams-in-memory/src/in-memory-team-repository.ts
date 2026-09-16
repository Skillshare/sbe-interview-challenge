import { Team, type TeamRepository, type TeamState } from '@platform/teams'

/** The substrate unit tests run on. Same port, no database. */
export class InMemoryTeamRepository implements TeamRepository {
  private readonly rows = new Map<string, TeamState>()

  constructor(seed: readonly TeamState[] = []) {
    for (const row of seed) this.rows.set(row.id, row)
  }

  async findById(id: string): Promise<Team | null> {
    const row = this.rows.get(id)
    return row === undefined ? null : Team.fromState(row)
  }

  async save(team: Team): Promise<void> {
    this.rows.set(team.id, team.toState())
  }
}
