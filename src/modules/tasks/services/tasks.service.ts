import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
  ) {}

  async create(dto: CreateTaskDto) {
    const newTask = this.tasksRepository.create(dto);
    return this.tasksRepository.save(newTask);
  }

  async update(id: string, dto: UpdateTaskDto) {
    await this.tasksRepository.update(id, dto);
    return this.tasksRepository.findOne({ where: { id } });
  }
}

export { TasksService };
