const { Module } = require('@nestjs/common');
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
const { TypeOrmModule } = require('@nestjs/typeorm');
const { User } = require('./users/user.entity');
const { Task } = require('./tasks/task.entity');  

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,
      username: 'seu_usuario',
      password: 'sua_senha', 
      database: 'todo_db',
      entities: [User, Task],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,

  ],
})
module.exports = AppModule;
