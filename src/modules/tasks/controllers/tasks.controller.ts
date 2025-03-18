const { Controller, Get, Post, Body } = require('@nestjs/common');
const { TasksService } = require('./tasks.service');

@Controller('tasks')
class TasksController {
  constructor(tasksService) {
    this.tasksService = tasksService;
  }

  @Post()
  create(@Body() task) {
    return this.tasksService.create(task);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
}

module.exports = { TasksController };
