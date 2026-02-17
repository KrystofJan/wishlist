import { Module } from '@nestjs/common';
import { ItemModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceSettings } from 'typeorm.config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { JWTModule } from './auth/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { JWTGuard } from './auth/jwt.guard';

@Module({
  imports: [
    JWTModule,
    ItemModule,
    CategoryModule,
    ConfigModule.forRoot({
      load: [config],
      envFilePath: '../.env',
      cache: true,
    }),
    TypeOrmModule.forRoot(dataSourceSettings),
    AuthModule.forRoot({ auth, disableGlobalAuthGuard: true }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTGuard,
    },
  ],
})
export class AppModule {}
