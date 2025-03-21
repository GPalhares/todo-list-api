import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { UUIDValidator } from 'src/modules/utils/uuid-validator';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { Request as ExpressRequest } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: ExpressRequest & { user: { id: string } },
  ) {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    UUIDValidator.validate(id);
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    UUIDValidator.validate(id);
    return this.tasksService.delete(id);
  }

  @Get('/user')
  @HttpCode(HttpStatus.OK)
  findAllByUser(@Request() req: ExpressRequest & { user: { id: string } }) {
    return this.tasksService.findAllByUser(req.user.id);
  }
}

export { TasksController };
