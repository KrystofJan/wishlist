import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Wishlist } from './wishlists.entity';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
import { WishlistService } from './wishlists.service';
import { CategoryExistsPipe } from 'src/category/category.pipe';
import { UserExistsPipe } from 'src/users/users.pipe';

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async getAll(
    @Query('extend') include?: string,
    @Query('categories', CategoryExistsPipe) categories?: number[],
    @Query('users', UserExistsPipe) users?: string[],
  ): Promise<Wishlist[]> {
    const includes = include?.split(',') ?? [];
    return this.wishlistService.findAll({
      includeItems: includes.includes('items'),
      includeUser: includes.includes('user'),
      users: users ?? [],
      categories: categories ?? [],
    });
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query('extend') include?: string,
  ): Promise<Wishlist> {
    const includes = include?.split(',') ?? [];
    return this.wishlistService.findById(id, {
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
