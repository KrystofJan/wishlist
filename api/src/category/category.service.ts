import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/items.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findItemsInCategory(id: number): Promise<Item[]> {
    const result = await this.categoryRepository.findOne({
      where: {
        id,
      },
      relations: {
        items: true,
      },
    });
    if (!result) {
      throw new NotFoundError('Could not find the value');
    }
    return result.items;
  }

  async create(categoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(categoryDto);
    return this.categoryRepository.save(category);
  }
}
