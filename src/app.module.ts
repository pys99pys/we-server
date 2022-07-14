import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot(
      `${process.env.MONGO_DB_HOST}/?retryWrites=true&w=majority`,
    ),
    SchedulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
