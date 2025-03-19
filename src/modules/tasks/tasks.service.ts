import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserEntity } from '../users/user.entity';
import { UserNotFoundException } from 'src/exceptions/users-exceptions';
import { TaskNotFoundException } from 'src/exceptions/tasks-exceptions';

@Injectable()
class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateTaskDto, userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundException();
    }

    const newTask = this.tasksRepository.create({
      ...dto,
      user,
    });

    return this.tasksRepository.save(newTask);
  }

  async findAll() {
    return this.tasksRepository.find();
  }

  async findAllByUser(userId: string) {
    return this.tasksRepository.find({
      where: { user: { id: userId } },
    });
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new TaskNotFoundException();
    }
    await this.tasksRepository.update(id, dto);
    return this.tasksRepository.findOneBy({ id });
  }

  async delete(id: string) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new TaskNotFoundException();
    }
    await this.tasksRepository.delete(id);
  }
}

export { TasksService };
