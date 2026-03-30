import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { Wishlist } from 'src/wishlists/wishlists.entity';

@Entity('user')
export class User {
  @PrimaryColumn('text')
  id!: string;

  @Column('text', { name: 'name' })
  name!: string;

  @Column('text', { name: 'email', unique: true })
  email!: string;

  @Column('boolean', { name: 'emailVerified', default: false })
  emailVerified!: boolean;

  @Column('text', { name: 'image', nullable: true })
  image: string | null;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlists?: Wishlist[];
}
