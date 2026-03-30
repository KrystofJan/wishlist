import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'data/entities/User';
import { In, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUsersWishlists(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { wishlists: true },
    });
    return user?.wishlists;
  }

  async findUsersWithIds(ids: string[]) {
    const user = await this.userRepository.find({
      where: { id: In(ids) },
    });
    return user;
  }

  async findAll() {
    return this.userRepository.find();
  }
}
