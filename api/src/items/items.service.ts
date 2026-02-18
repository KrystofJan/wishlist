import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { Item } from './items.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find({
      relations: {
        categories: true,
        wishlists: true,
      },
    });
  }

  async create(itemDto: CreateItemDto): Promise<Item> {
    return this.dataSource.transaction(async (manager) => {
      const { categories: categoryIds, ...rest } = itemDto;
      let categories: Category[] = [];
      if (categoryIds) {
        categories = await manager.find(Category, {
          where: { id: In(categoryIds) },
        });
      }
      const item = manager.create(Item, { ...rest, categories });
      return manager.save(item);
    });
  }
}
