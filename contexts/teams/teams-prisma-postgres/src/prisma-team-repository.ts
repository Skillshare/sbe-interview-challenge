import { activeClient, type PrismaClient } from '@platform/persistence'
import { Team, type TeamRepository } from '@platform/teams'

/** Adapter. Maps rows to aggregates and back; the domain never sees Prisma. */
export class PrismaTeamRepository implements TeamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Team | null> {
    const row = await activeClient(this.prisma).team.findUnique({
      where: { id },
      include: { members: true },
    })
    if (row === null) return null

    return Team.fromState({
      id: row.id,
      name: row.name,
      planCode: row.planCode,
      members: row.members.map((member) => ({
        id: member.id,
        teamId: member.teamId,
        name: member.name,
        email: member.email,
      })),
    })
  }

  async save(team: Team): Promise<void> {
    const state = team.toState()
    await activeClient(this.prisma).team.update({
      where: { id: state.id },
      data: { name: state.name, planCode: state.planCode },
    })
  }
}
