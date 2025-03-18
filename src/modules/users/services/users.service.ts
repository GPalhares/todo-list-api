import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
class UsersService {
  private usersRepository: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity) usersRepository: Repository<UserEntity>,
  ) {
    this.usersRepository = usersRepository;
  }

  async create(dto: CreateUserDto) {
    const newUser = this.usersRepository.create(dto);
    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async softDelete(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.deleted_at = new Date();
    return this.usersRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    await this.usersRepository.update(id, dto);
    return this.usersRepository.findOne({ where: { id } });
  }
}

export { UsersService };
