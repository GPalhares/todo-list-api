const { Controller, Get, Post, Body } = require('@nestjs/common');
const { UsersService } = require('./users.service');

@Controller('users')
class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  @Post()
  create(@Body() user) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}

module.exports = { UsersController };
