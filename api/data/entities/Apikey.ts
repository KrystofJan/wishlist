import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('apikey')
export class Apikey {
  @PrimaryColumn('text')
  id!: string;

  @Index('apikey_configId_idx')
  @Column('text', { name: 'configId', default: "default" })
  configId!: string;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'start', nullable: true })
  start: string | null;

  @Index('apikey_referenceId_idx')
  @Column('text', { name: 'referenceId' })
  referenceId!: string;

  @Column('text', { name: 'prefix', nullable: true })
  prefix: string | null;

  @Index('apikey_key_idx')
  @Column('text', { name: 'key' })
  key!: string;

  @Column('integer', { name: 'refillInterval', nullable: true })
  refillInterval: number | null;

  @Column('integer', { name: 'refillAmount', nullable: true })
  refillAmount: number | null;

  @Column('datetime', { name: 'lastRefillAt', nullable: true })
  lastRefillAt: Date | null;

  @Column('boolean', { name: 'enabled', nullable: true, default: true })
  enabled: boolean | null;

  @Column('boolean', { name: 'rateLimitEnabled', nullable: true, default: true })
  rateLimitEnabled: boolean | null;

  @Column('integer', { name: 'rateLimitTimeWindow', nullable: true, default: 86400000 })
  rateLimitTimeWindow: number | null;

  @Column('integer', { name: 'rateLimitMax', nullable: true, default: 10 })
  rateLimitMax: number | null;

  @Column('integer', { name: 'requestCount', nullable: true, default: 0 })
  requestCount: number | null;

  @Column('integer', { name: 'remaining', nullable: true })
  remaining: number | null;

  @Column('datetime', { name: 'lastRequest', nullable: true })
  lastRequest: Date | null;

  @Column('datetime', { name: 'expiresAt', nullable: true })
  expiresAt: Date | null;

  @Column('datetime', { name: 'createdAt' })
  createdAt!: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt!: Date;

  @Column('text', { name: 'permissions', nullable: true })
  permissions: string | null;

  @Column('text', { name: 'metadata', nullable: true })
  metadata: string | null;

}