import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor() {
    super('Tarefa não encontrada', HttpStatus.NOT_FOUND);
  }
}
