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

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const user: UserEntity | null = await this.usersService.findOne(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new InvalidCredentials();
    }

    return this.generateToken(user);
  }

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    const { email } = registerDto;

    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      throw new EmailAlreadyInUse();
    }

    const user = await this.usersService.create(registerDto);

    return this.generateToken(user);
  }

  private async generateToken(
    user: UserEntity,
  ): Promise<{ access_token: string }> {
    const payload = {
      id: user.id,
      email: user.email,
      user_type: user.user_type,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
