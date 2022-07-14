import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ScheduleCreateDTO {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  dueAt: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => [Number])
  userIds: number[];
}
