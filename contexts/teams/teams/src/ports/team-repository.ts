import type { Team } from '../entities/team'

/** Port. Read and write paths for teams stay behind this. */
export interface TeamRepository {
  findById(id: string): Promise<Team | null>
  save(team: Team): Promise<void>
}

export const TEAM_REPOSITORY = Symbol('TeamRepository')
