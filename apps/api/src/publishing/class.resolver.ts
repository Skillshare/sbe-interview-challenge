import { Inject, NotFoundException } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CLASS_REPOSITORY, type ClassRepository, type ClassState, PublishClass } from '@platform/publishing'
import { ClassModel, ClassStatusEnum } from './class.model'

const toModel = (state: ClassState): ClassModel => ({
  id: state.id,
  teacherId: state.teacherId,
  title: state.title,
  status: state.status === 'published' ? ClassStatusEnum.published : ClassStatusEnum.draft,
  publishedAt: state.publishedAt,
})

@Resolver(() => ClassModel)
export class ClassResolver {
  constructor(
    @Inject(CLASS_REPOSITORY) private readonly classes: ClassRepository,
    private readonly publishClass: PublishClass,
  ) {}

  @Query(() => ClassModel, { nullable: true })
  async class(@Args('id', { type: () => ID }) id: string): Promise<ClassModel | null> {
    const found = await this.classes.findById(id)
    if (found === null) throw new NotFoundException(`Class ${id} was not found`)
    return toModel(found.toState())
  }

  @Mutation(() => ClassModel)
  async publish(@Args('classId', { type: () => ID }) classId: string): Promise<ClassModel> {
    return toModel(await this.publishClass.execute({ classId }))
  }
}
