import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
class TasksService {
  private tasksRepository: Repository<TaskEntity>;

  constructor(
    @InjectRepository(TaskEntity) tasksRepository: Repository<TaskEntity>,
  ) {
    this.tasksRepository = tasksRepository;
  }

  async create(dto: CreateTaskDto) {
    const newTask = this.tasksRepository.create(dto);
    return this.tasksRepository.save(newTask);
  }

  async findAll() {
    return this.tasksRepository.find();
  }
}

export { TasksService };
