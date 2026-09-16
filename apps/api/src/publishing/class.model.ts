import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'

export enum ClassStatusEnum {
  draft = 'draft',
  published = 'published',
}

registerEnumType(ClassStatusEnum, { name: 'ClassStatus' })

@ObjectType('Class')
export class ClassModel {
  @Field(() => ID) id!: string
  @Field(() => ID) teacherId!: string
  @Field() title!: string
  @Field(() => ClassStatusEnum) status!: ClassStatusEnum
  @Field(() => Date, { nullable: true }) publishedAt!: Date | null
}
