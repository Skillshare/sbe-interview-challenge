import { Inject, NotFoundException } from '@nestjs/common'
import { Args, ID, Query, Resolver } from '@nestjs/graphql'
import { TEAM_REPOSITORY, type TeamRepository } from '@platform/teams'
import { TeamModel } from './team.model'

/** Resolvers stay thin: they translate, they do not decide. */
@Resolver(() => TeamModel)
export class TeamResolver {
  constructor(@Inject(TEAM_REPOSITORY) private readonly teams: TeamRepository) {}

  @Query(() => TeamModel, { nullable: true })
  async team(@Args('id', { type: () => ID }) id: string): Promise<TeamModel | null> {
    const team = await this.teams.findById(id)
    if (team === null) throw new NotFoundException(`Team ${id} was not found`)

    const state = team.toState()
    return {
      id: state.id,
      name: state.name,
      planCode: state.planCode,
      members: state.members.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
      })),
    }
  }
}
