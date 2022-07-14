import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
    currentTime: () => +new Date(),
  },
})
@ObjectType()
export class Schedule {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  @Field(() => String)
  title: string;
  @Prop()
  @Field(() => String)
  content: string;
  @Prop()
  @Field(() => String)
  dueAt: string | null;
  @Prop()
  @Field(() => String)
  completedAt: string | null;
  @Prop()
  @Field(() => [String])
  tags: string[];
  @Prop()
  @Field(() => [Number])
  userIds: number[];
  @Field(() => String)
  createdAt: string;
  @Field(() => String)
  updatedAt: string;
}

export const Schedulechema = SchemaFactory.createForClass(Schedule);
