import { Body, Controller, Get, Post } from '@nestjs/common';
import { Wishlist } from './wishlists.entity';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
import { WishlistService } from './wishlists.service';

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async getAll(): Promise<Wishlist[]> {
    return this.wishlistService.findAll();
  }

  @Post()
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return this.wishlistService.create(createWishlistDto);
  }
}
