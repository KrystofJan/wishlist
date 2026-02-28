import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'data/entities/User';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUsersWishlists(id: string) {
    console.log(id);
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { wishlists: true },
    });
    if (!user) {
      throw new NotFoundError(`could not find the user with the ${id} id`);
    }
    return user.wishlists || [];
  }
}
