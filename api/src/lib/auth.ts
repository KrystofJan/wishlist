// api/auth.ts  (CLI-only config file)
import { betterAuth } from 'better-auth';
import { typeormAdapter } from '@hedystia/better-auth-typeorm';
import { DataSource } from 'typeorm';
import * as path from 'path';

const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: path.join(__dirname, '../../../data/dev.sqlite'),
  entities: [
    path.join(__dirname, 'src/**/*.entity{.ts,.js}'),
    path.join(__dirname, 'typeorm/entities/**/*{.ts,.js}'),
  ],
  migrations: [path.join(__dirname, 'typeorm/migrations/**/*{.ts,.js}')],
  synchronize: false,
});

export const auth = betterAuth({
  database: typeormAdapter(dataSource),
  emailAndPassword: { enabled: true },
});
