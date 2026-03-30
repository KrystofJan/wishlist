import { betterAuth } from 'better-auth';
import { bearer, jwt } from 'better-auth/plugins';
import { typeormAdapter } from '@hedystia/better-auth-typeorm';
import AppDataSource from '../../typeorm.config';
import { apiKey } from '@better-auth/api-key';
import { AUTH_OPTIONS } from './constants';

export const auth = betterAuth({
  database: typeormAdapter(AppDataSource, {
    outputDir: './data',
    entitiesDir: './data/entities',
    migrationsDir: './data/migrations',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    jwt(),
    bearer(),
    apiKey({
      apiKeyHeaders: AUTH_OPTIONS.HeaderName,
    }),
  ],
  secret: process.env.BETTER_AUTH_SECRET!,
  trustedOrigins: ['http://localhost:5173'],
  baseURL: process.env.BETTER_AUTH_URL!,
});
