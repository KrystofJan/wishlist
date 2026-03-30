import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoriesController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryExistsPipe } from './category.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule],
  providers: [CategoryService, CategoryExistsPipe],
  controllers: [CategoriesController],
  exports: [CategoryExistsPipe, CategoryService],
})
export class CategoryModule {}
