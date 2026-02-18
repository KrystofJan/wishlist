import { Category } from 'src/category/category.entity';
import { Wishlist } from 'src/wishlists/wishlists.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  link: string;

  @Column('text')
  photoLink: string;

  @ManyToMany(() => Category, (cat) => cat.items)
  categories?: Category[];

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  wishlists?: Category[];
}
