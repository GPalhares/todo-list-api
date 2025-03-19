import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateTaskDto) {
    const user = await this.usersRepository.findOne({
      where: { id: dto.userId ?? IsNull() },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newTask = this.tasksRepository.create({
      ...dto,
      user: user,
    });

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
      throw new NotFoundException('Task not found');
    }
    await this.tasksRepository.update(id, dto);
    return this.tasksRepository.findOneBy({ id });
  }

  async softDelete(id: string) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.deleted_at = new Date();
    return this.tasksRepository.save(task);
  }
}

export { TasksService };
