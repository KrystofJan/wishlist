import { Module } from '@nestjs/common';
import { ItemModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceSettings } from 'typeorm.config';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { WishlistModule } from './wishlists/wishlists.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    BetterAuthModule.forRoot({ auth, disableGlobalAuthGuard: true }),
    CategoryModule,
    ConfigModule.forRoot({
      load: [config],
      envFilePath: '../.env',
      cache: true,
    }),
    ItemModule,
    AuthModule,
    TypeOrmModule.forRoot(dataSourceSettings),
    WishlistModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
