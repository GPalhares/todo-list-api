import { BadRequestException } from '@nestjs/common';

class UUIDValidator {
  static validate(id: string) {
    if (!id.match(/^[0-9a-fA-F-]{36}$/)) {
      throw new BadRequestException('Invalid UUID format');
    }
  }
}

export { UUIDValidator };
