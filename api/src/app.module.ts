import { Module } from '@nestjs/common';
import { ItemModule } from './items/items.module';

@Module({
  imports: [ItemModule],
})
export class AppModule {}
