import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { format } from 'date-fns';
import { ScheduleCreateDTO } from './dto/scheduleCreate.dto';
import { ScheduleUpdateDTO } from './dto/scheduleUpdate.dto';
import { ScheduleType } from './interface/ScheduleType';
import { Schedule } from './schema/schedule.schema';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<Schedule>,
  ) {}

  public async getSchedules(type: ScheduleType) {
    if (type === ScheduleType.TODAY) {
      return await this.scheduleModel
        .find({ dueAt: format(new Date(), 'yyyy-MM-dd') })
        .sort('dueAt')
        .exec();
    }

    if (type === ScheduleType.EXPECT) {
      return await this.scheduleModel
        .find({ dueAt: { $ne: null }, completedAt: null })
        .sort('dueAt')
        .exec();
    }

    if (type === ScheduleType.COMPLETE) {
      return await this.scheduleModel
        .find({ completedAt: { $ne: null } })
        .sort('dueAt')
        .exec();
    }

    return await this.scheduleModel.find().sort('dueAt').exec();
  }

  public async getSchedule(_id: string) {
    try {
      return await this.scheduleModel.findOne({ _id }).exec();
    } catch {
      throw new HttpException('일정이 없습니다.', HttpStatus.NOT_FOUND);
    }
  }

  public async createSchedule(data: ScheduleCreateDTO): Promise<Schedule> {
    const schedule = new this.scheduleModel({
      ...data,
      completedAt: null,
    });

    return await schedule.save();
  }

  public async updateSchedule(data: ScheduleUpdateDTO): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(data._id);

    schedule.title = data.title;
    schedule.content = data.content;
    schedule.tags = data.tags;
    schedule.dueAt = data.dueAt;
    schedule.userIds = data.userIds;

    await schedule.save();
    return schedule;
  }

  public async removeSchedule(_id: string): Promise<Schedule> {
    return await this.scheduleModel.findByIdAndDelete(_id);
  }

  public async toggleSchedule(_id: string): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(_id);
    schedule.completedAt = schedule.completedAt
      ? null
      : format(new Date(), 'yyyy-MM-dd');

    await schedule.save();
    return schedule;
  }
}
