import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JWTService } from './auth.service';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Reflector } from '@nestjs/core';
import { auth } from 'src/lib/auth';
import { AUTH_OPTIONS } from 'src/lib/constants';

@Injectable()
export class AuthGuard implements CanActivate {
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
      const apiKey = request.headers[AUTH_OPTIONS.HeaderName];
      if (apiKey) {
        const { valid } = await auth.api.verifyApiKey({
          body: {
            key: apiKey,
          },
        });
        return valid;
      }

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
