import { DataSource } from 'typeorm';
import { Item } from './items.entity';

export const itemProviders = [
  {
    provide: 'ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Item),
    inject: ['DATA_SOURCE'],
  },
];
