import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentials extends HttpException {
  constructor() {
    super('E-mail ou senha inválidos', HttpStatus.UNAUTHORIZED);
  }
}

export class EmailAlreadyInUse extends HttpException {
  constructor() {
    super('E-mail já está em uso', HttpStatus.CONFLICT);
  }
}
