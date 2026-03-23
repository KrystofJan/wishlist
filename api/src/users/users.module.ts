import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'data/entities/User';
import { UserExistsPipe } from './users.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserExistsPipe],
  controllers: [UsersController],
  exports: [UserExistsPipe, UsersService],
})
export class UsersModule {}
