import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoriesController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { JWTModule } from 'src/auth/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), JWTModule],
  providers: [CategoryService],
  controllers: [CategoriesController],
})
export class CategoryModule {}
