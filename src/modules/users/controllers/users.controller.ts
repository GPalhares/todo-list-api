import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UUIDValidator } from 'src/modules/utils/uuid-validator';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { user_type: number };
}

@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    const { user_type } = req.user;
    return this.usersService.findAll(user_type);
  }

  @UseGuards(AuthGuard)
  @Patch('softdelete/:id')
  softDelete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    UUIDValidator.validate(id);
    const { user_type } = req.user;
    return this.usersService.softDelete(id, user_type);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    UUIDValidator.validate(id);
    const { user_type } = req.user;
    return this.usersService.update(id, updateUserDto, user_type);
  }
}

export { UsersController };
