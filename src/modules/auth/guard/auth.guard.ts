import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import { AuthenticatedRequest } from './interfaces/authenticated.interface';
import { UnauthorizedException } from 'src/exceptions/commom-exceptions';

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: { id: string; email: string; userType: number } =
        await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

      request.user = payload;
    } catch (error) {
      console.error('JWT Verification Error:', error);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');

    return type === 'Bearer' ? token : undefined;
  }
}
