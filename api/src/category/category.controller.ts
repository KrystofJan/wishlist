import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  getAll() {
    return this.categoryService.findAll();
  }

  @Get(':id/items')
  getItems(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findItemsInCategory(id);
  }
}
