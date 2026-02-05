import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/database/database.providers';
import { authProviders } from './auth.providers';

@Module({
  providers: [...databaseProviders, ...authProviders],
  exports: ['BETTER_AUTH'],
})
export class AuthModule {}
