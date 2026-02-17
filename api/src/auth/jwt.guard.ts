import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JWTService } from './jwt.service';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private readonly jwtService: JWTService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
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
