import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Member')
export class MemberModel {
  @Field(() => ID) id!: string
  @Field() name!: string
  @Field() email!: string
}

@ObjectType('Team')
export class TeamModel {
  @Field(() => ID) id!: string
  @Field() name!: string
  @Field() planCode!: string
  @Field(() => [MemberModel]) members!: MemberModel[]
}
