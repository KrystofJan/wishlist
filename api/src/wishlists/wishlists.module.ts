import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlists.entity';
import { WishlistService } from './wishlists.service';
import { WishlistController } from './wishlists.controller';
import { CategoryModule } from 'src/category/category.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), CategoryModule, UsersModule],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
