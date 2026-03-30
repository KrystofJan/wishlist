import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('jwks')
export class Jwks {
  @PrimaryColumn('text')
  id!: string;

  @Column('text', { name: 'publicKey' })
  publicKey!: string;

  @Column('text', { name: 'privateKey' })
  privateKey!: string;

  @Column('datetime', { name: 'createdAt' })
  createdAt!: Date;

  @Column('datetime', { name: 'expiresAt', nullable: true })
  expiresAt: Date | null;

}