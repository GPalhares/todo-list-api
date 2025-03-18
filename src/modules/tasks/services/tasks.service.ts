import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsNull } from 'typeorm';
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

  async findAll() {
    return this.tasksRepository.find();
  }

  async findAllByUser(userId: string) {
    return this.tasksRepository.find({
      where: { user: { id: userId }, deleted_at: IsNull() },
    });
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new Error('Task not found');
    }
    await this.tasksRepository.update(id, dto);
    return this.tasksRepository.findOneBy({ id });
  }

  async softDelete(id: string) {
    return this.tasksRepository.update(id, { deleted_at: new Date() });
  }
}

export { TasksService };
