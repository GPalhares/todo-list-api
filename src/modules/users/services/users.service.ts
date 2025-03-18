import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

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
}

export { UsersService };
