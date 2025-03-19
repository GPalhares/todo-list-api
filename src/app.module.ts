import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './modules/users/user.entity';
import { TaskEntity } from './modules/tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'adminpass',
      database: 'todo-list',
      entities: [UserEntity, TaskEntity],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
