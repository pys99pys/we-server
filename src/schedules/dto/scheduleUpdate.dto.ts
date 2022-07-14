import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ScheduleUpdateDTO {
  @Field()
  _id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  dueAt: string | null;

  @Field(() => [String])
  tags: string[];

  @Field(() => [Number])
  userIds: number[];
}
