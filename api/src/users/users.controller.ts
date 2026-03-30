import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundError } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/wishlists')
  async getUserWishlists(@Param('id') id: string) {
    const wishlists = await this.usersService.findUsersWishlists(id);
    if (wishlists === undefined) {
      throw new NotFoundError(`could not find the user with the ${id} id`);
    }
    return wishlists;
  }

  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }
}
