import { YogaDriver, type YogaDriverConfig } from '@graphql-yoga/nestjs'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { CompositionModule } from './composition/composition.module'
import { ClassResolver } from './publishing/class.resolver'
import { TeamResolver } from './teams/team.resolver'

@Module({
  imports: [
    CompositionModule,
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: 'apps/api/schema.graphql',
      sortSchema: true,
      graphiql: true,
    }),
  ],
  providers: [TeamResolver, ClassResolver],
})
export class AppModule {}
