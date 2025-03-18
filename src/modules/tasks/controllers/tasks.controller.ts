import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('tasks')
class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() task: CreateTaskDto) {
    return this.tasksService.create(task);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
}

export { TasksController };
