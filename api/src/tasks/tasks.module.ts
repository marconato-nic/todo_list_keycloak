import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { taskProviders } from './tasks.providers';
import { TaskService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [...taskProviders, TaskService],
})
export class TaskModule {}
