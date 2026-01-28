import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ItemService } from './items.service';
import { itemProviders } from './items.providers';
import { ItemsController } from './items.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...itemProviders, ItemService],
  controllers: [ItemsController],
})
export class ItemModule {}
