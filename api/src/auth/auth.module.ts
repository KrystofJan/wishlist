import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JWTService as AuthService } from './auth.service';

@Module({
  imports: [ConfigModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
