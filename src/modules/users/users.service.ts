import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UnauthorizedException } from 'src/exceptions/commom-exceptions';
import { UserNotFoundException } from 'src/exceptions/users-exceptions';

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
      throw new UnauthorizedException();
    }
    return await this.usersRepository.find();
  }

  async softDelete(id: string, userType: number) {
    if (userType !== 2) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }

    user.deleted_at = new Date();
    return this.usersRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto, userType: number) {
    if (userType !== 2) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }

    await this.usersRepository.update(id, dto);
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOne(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}

export { UsersService };
