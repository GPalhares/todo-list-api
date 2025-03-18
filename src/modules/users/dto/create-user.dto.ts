import { IsString, IsEmail, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  user_type: number;

  @Type(() => Date)
  deletedAt: Date;
}

export { CreateUserDto };
