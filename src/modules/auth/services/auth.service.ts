import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const user: UserEntity | null = await this.usersService.findOne(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateToken(user);
  }

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
    const { email } = registerDto;

    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.usersService.create(registerDto);
    return this.generateToken(user);
  }

  private async generateToken(
    user: UserEntity,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      user_type: user.user_type,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
