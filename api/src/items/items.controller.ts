import { Controller, Post, Body, Get } from '@nestjs/common';
import { ItemService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  getAll() {
    return this.itemsService.findAll();
  }
}
