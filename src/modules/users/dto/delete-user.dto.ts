import { IsUUID } from 'class-validator';

class DeleteUserDto {
  @IsUUID()
  id: string;
}

export { DeleteUserDto };
