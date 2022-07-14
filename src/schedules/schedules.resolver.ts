import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ScheduleCreateDTO } from './dto/scheduleCreate.dto';
import { ScheduleUpdateDTO } from './dto/scheduleUpdate.dto';
import { ScheduleType } from './interface/ScheduleType';
import { ScheduleItem } from './interface/ScheduleItem';
import { SchedulesService } from './schedules.service';

@Resolver()
export class SchedulesResolver {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Query(() => [ScheduleItem], { name: 'getSchedules' })
  public getSchedules(@Args('type') type: ScheduleType) {
    return this.schedulesService.getSchedules(type);
  }

  @Query(() => ScheduleItem, { name: 'getSchedule' })
  public getSchedule(@Args('_id') _id: string) {
    return this.schedulesService.getSchedule(_id);
  }

  @Mutation(() => ScheduleItem, { name: 'createSchedule' })
  public createSchedule(@Args('data') data: ScheduleCreateDTO) {
    return this.schedulesService.createSchedule(data);
  }

  @Mutation(() => ScheduleItem, { name: 'updateSchedule' })
  public updateSchedule(@Args('data') data: ScheduleUpdateDTO) {
    return this.schedulesService.updateSchedule(data);
  }

  @Mutation(() => ScheduleItem, { name: 'removeSchedule' })
  public removeSchedule(@Args('_id') id: string) {
    return this.schedulesService.removeSchedule(id);
  }

  @Mutation(() => ScheduleItem, { name: 'toggleSchedule' })
  public toggleSchedule(@Args('_id') id: string) {
    return this.schedulesService.toggleSchedule(id);
  }
}
