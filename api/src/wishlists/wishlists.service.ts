import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './wishlists.entity';
import { DataSource, In, Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
import { Item } from 'src/items/items.entity';
import { User } from 'data/entities/User';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    return this.dataSource.transaction(async (manager) => {
      const { name, description, items: itemIds, user_id } = createWishlistDto;
      const items = await manager.find(Item, {
        where: { id: In(itemIds) },
      });
      if (items.length !== itemIds.length) {
        throw new NotFoundException('One or more items not found');
      }

      const user = await manager.findOne(User, {
        where: { id: user_id },
      });
      if (!user) {
        throw new NotFoundException(
          `Could not find the user by the following id: ${user_id}`,
        );
      }

      const wishlist = manager.create(Wishlist, {
        name,
        description,
        items,
        user,
      });
      return manager.save(wishlist);
    });
  }
}
