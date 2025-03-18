const { Module } = require('@nestjs/common');
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
const { TypeOrmModule } = require('@nestjs/typeorm');
const { User } = require('./modules/users/user.entity');
const { Task } = require('./modules/tasks/task.entity');  

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,
      username: 'admin',
      password: 'admin', 
      database: 'todo-list-db',
      entities: [User, Task],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,

  ],
})

module.exports = AppModule;
