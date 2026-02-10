import { Controller, Post, Body, Get } from '@nestjs/common';
import { ItemService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemService) {}

  @Post()
  @AllowAnonymous()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @AllowAnonymous()
  getAll() {
    return this.itemsService.findAll();
  }
}
