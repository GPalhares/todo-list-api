import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UnauthorizedException } from 'src/exceptions/commom-exceptions';
import { UserNotFoundException } from 'src/exceptions/users-exceptions';
import { instanceToPlain } from 'class-transformer';
import { EmailAlreadyInUse } from 'src/exceptions/auth-exceptions';

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

    const users = await this.usersRepository.find({
      where: {
        userType: Not(2),
      },
    });

    return users.map((user) => instanceToPlain(user));
  }

  async softDelete(id: string, userType: number) {
    if (userType !== 2) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }

    user.deletedAt = new Date();
    return this.usersRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new UserNotFoundException();
    }

    if (dto.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: dto.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new EmailAlreadyInUse();
      }
    }

    await this.usersRepository.update(id, dto);

    const updatedUser = await this.usersRepository.findOne({ where: { id } });

    return instanceToPlain(updatedUser);
  }

  async findOne(email: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    return instanceToPlain(user) as UserEntity;
  }

  async restore(id: string, userType: number) {
    if (userType !== 2) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }

    user.deletedAt = null;
    return this.usersRepository.save(user);
  }
}

export { UsersService };
