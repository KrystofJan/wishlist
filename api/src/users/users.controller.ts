import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/wishlists')
  async getUserWishlists(@Param('id') id: string) {
    return this.usersService.findUsersWishlists(id);
  }
}
