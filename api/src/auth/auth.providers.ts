import { DataSource } from 'typeorm';
import { betterAuth } from 'better-auth';
import { typeormAdapter } from '@hedystia/better-auth-typeorm';

export const authProviders = [
  {
    provide: 'AUTH',
    useFactory: async (dataSource: DataSource) => {
      return betterAuth({
        database: typeormAdapter(dataSource),
        emailAndPassword: { enabled: true },
      });
    },
    inject: ['DATA_SOURCE'],
  },
];
