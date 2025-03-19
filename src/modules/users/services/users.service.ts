import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const newUser = this.usersRepository.create(dto);
    return await this.usersRepository.save(newUser);
  }

  async findAll(userType: number) {
    if (userType !== 2) {
      throw new ForbiddenException('Access denied');
    }
    return await this.usersRepository.find();
  }

  async softDelete(id: string, userType: number) {
    if (userType !== 2) {
      throw new ForbiddenException('Access denied');
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    user.deleted_at = new Date();
    return this.usersRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto, userType: number) {
    if (userType !== 2) {
      throw new ForbiddenException('Access denied');
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    await this.usersRepository.update(id, dto);
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOne(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}

export { UsersService };
