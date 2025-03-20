import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';

import {
  EmailAlreadyInUse,
  InvalidCredentials,
} from 'src/exceptions/auth-exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(
    user: UserEntity,
  ): Promise<{ accessToken: string }> {
    const payload = {
      id: user.id,
      email: user.email,
      userType: user.userType,
      name: user.name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user: UserEntity | null = await this.usersService.findOne(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new InvalidCredentials();
    }

    return this.generateToken(user);
  }

  async register(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const { email } = registerDto;

    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      throw new EmailAlreadyInUse();
    }

    const user = await this.usersService.create(registerDto);

    return this.generateToken(user);
  }
}
