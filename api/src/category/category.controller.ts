import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.categoryService.findAll();
  }
}
