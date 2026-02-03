import { Module } from '@nestjs/common';
import { ItemModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    ItemModule,
    ConfigModule.forRoot({
      load: [config],
      envFilePath: '../.env',
      cache: true,
    }),
  ],
})
export class AppModule {}
