import { Controller, Post, Body, Get } from '@nestjs/common';
import { ItemService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemService) {}

  @Post()
  @Public()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @Public()
  getAll() {
    return this.itemsService.findAll();
  }
}
