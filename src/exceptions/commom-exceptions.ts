import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super('Acesso não autorizado', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidUUIDException extends HttpException {
  constructor() {
    super('ID inválido', HttpStatus.BAD_REQUEST);
  }
}
