import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    private readonly jwtService: JWTService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // NOTE: Skip public routes
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const idToken = request.headers['authorization']?.split(' ')[1];
      const token = await this.jwtService.verifyToken(idToken);
      if (!token) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
