import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('verification')
export class Verification {
  @PrimaryColumn('text')
  id!: string;

  @Index('verification_identifier_idx')
  @Column('text', { name: 'identifier' })
  identifier!: string;

  @Column('text', { name: 'value' })
  value!: string;

  @Column('datetime', { name: 'expiresAt' })
  expiresAt!: Date;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column('datetime', { name: 'updatedAt', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

}