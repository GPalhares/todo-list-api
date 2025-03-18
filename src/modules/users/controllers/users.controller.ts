import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private validateUUID(id: string) {
    if (!id.match(/^[0-9a-fA-F-]{36}$/)) {
      throw new BadRequestException('Invalid UUID format');
    }
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('softdelete/:id')
  softDelete(@Param('id') id: string) {
    this.validateUUID(id);
    return this.usersService.softDelete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.validateUUID(id);
    return this.usersService.update(id, updateUserDto);
  }
}

export { UsersController };
