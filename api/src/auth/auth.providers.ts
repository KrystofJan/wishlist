import { betterAuth } from 'better-auth';
import { typeormAdapter } from '@hedystia/better-auth-typeorm';
import { DataSource } from 'typeorm';

export const authProviders = [
  {
    provide: 'BETTER_AUTH',
    inject: ['DATA_SOURCE'],
    useFactory: async (dataSource: DataSource) => {
      return betterAuth({
        database: typeormAdapter(dataSource),

        // your auth config
        secret: process.env.AUTH_SECRET!,
        baseURL: 'http://localhost:3000',
      });
    },
  },
];
