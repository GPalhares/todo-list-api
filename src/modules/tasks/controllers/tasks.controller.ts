import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('tasks')
class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  private validateUUID(id: string) {
    if (!id.match(/^[0-9a-fA-F-]{36}$/)) {
      throw new BadRequestException('Invalid UUID format');
    }
  }

  @Post()
  create(@Body() task: CreateTaskDto) {
    return this.tasksService.create(task);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    this.validateUUID(id);
    return this.tasksService.update(id, updateTaskDto);
  }
}
export { TasksController };
