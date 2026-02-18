import type { User } from 'better-auth';
import { Item } from 'src/items/items.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('wishlist')
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @ManyToMany(() => Item, (item) => item.wishlists)
  @JoinTable()
  items: Item[];

  @ManyToOne('User', 'wishlists')
  user: User;
}
