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
  user: { userType: number; id: string };
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
    const { userType } = req.user;
    return this.usersService.findAll(userType);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: AuthenticatedRequest) {
    const { id } = req.user;
    return this.usersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const { id } = req.user;
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch('restore/:id')
  @HttpCode(HttpStatus.OK)
  restore(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    UUIDValidator.validate(id);
    const { userType } = req.user;
    return this.usersService.restore(id, userType);
  }

  @UseGuards(AuthGuard)
  @Patch('softdelete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  softDelete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    UUIDValidator.validate(id);
    const { userType } = req.user;
    return this.usersService.softDelete(id, userType);
  }
}

export { UsersController };
