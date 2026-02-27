import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Wishlist } from './wishlists.entity';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
import { WishlistService } from './wishlists.service';

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async getAll(@Query('extend') include?: string): Promise<Wishlist[]> {
    const includes = include?.split(',') ?? [];
    return this.wishlistService.findAll({
      includeItems: includes.includes('items'),
      includeUser: includes.includes('user'),
    });
  }

  @Post()
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return this.wishlistService.create(createWishlistDto);
  }
}
