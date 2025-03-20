import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { UUIDValidator } from 'src/modules/utils/uuid-validator';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

interface AuthenticatedRequest extends Request {
  user: { user_type: number; id: string };
}

@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: AuthenticatedRequest) {
    const { user_type } = req.user;
    return this.usersService.findAll(user_type);
  }

  @UseGuards(AuthGuard)
  @Patch('softdelete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  softDelete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    UUIDValidator.validate(id);
    const { user_type } = req.user;
    return this.usersService.softDelete(id, user_type);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: AuthenticatedRequest) {
    const { id } = req.user;
    return this.usersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
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
