const { Injectable } = require('@nestjs/common');
const { InjectRepository } = require('@nestjs/typeorm');
const { Repository } = require('typeorm');
const { User } = require('./user.entity');

@Injectable()
class UsersService {
  constructor(@InjectRepository(User) this.usersRepository) {}

  async create(user) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findAll() {
    return this.usersRepository.find();
  }
}

module.exports = { UsersService };
