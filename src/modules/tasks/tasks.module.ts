import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
