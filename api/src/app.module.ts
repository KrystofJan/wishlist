import { Module } from '@nestjs/common';
import { ItemModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceSettings } from 'typeorm.config';

@Module({
  imports: [
    ItemModule,
    CategoryModule,
    ConfigModule.forRoot({
      load: [config],
      envFilePath: '../.env',
      cache: true,
    }),
    TypeOrmModule.forRoot(dataSourceSettings),
  ],
})
export class AppModule {}
