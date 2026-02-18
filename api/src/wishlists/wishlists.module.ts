import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlists.entity';
import { WishlistService } from './wishlists.service';
import { WishlistController } from './wishlists.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
