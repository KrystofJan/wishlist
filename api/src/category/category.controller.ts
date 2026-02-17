import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JWTGuard } from 'src/auth/jwt.guard';

@Controller('categories')
@UseGuards(JWTGuard)
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
}
