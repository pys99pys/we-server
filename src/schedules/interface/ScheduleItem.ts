import { Field, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class ScheduleItem {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => String, { nullable: true })
  dueAt: string | null;

  @Field(() => String, { nullable: true })
  completedAt: string | null;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => [Number])
  userIds: number[];
}
