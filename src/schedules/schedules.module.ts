import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, Schedulechema } from './schema/schedule.schema';
import { SchedulesResolver } from './schedules.resolver';
import { SchedulesService } from './schedules.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Schedule.name,
        schema: Schedulechema,
      },
    ]),
  ],
  providers: [SchedulesResolver, SchedulesService],
})
export class SchedulesModule {}
