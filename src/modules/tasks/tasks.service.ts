const { Injectable } = require('@nestjs/common');
const { InjectRepository } = require('@nestjs/typeorm');
const { Repository } = require('typeorm');
const { Task } = require('./task.entity');

@Injectable()
class TasksService {
  constructor(@InjectRepository(Task) this.tasksRepository) {}

  async create(task) {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  async findAll() {
    return this.tasksRepository.find();
  }
}

module.exports = { TasksService };
