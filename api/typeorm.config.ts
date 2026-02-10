import path from 'path';
import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';

console.log(path.resolve(__dirname, 'data/dev.sqlite'));
export const dataSourceSettings: DataSourceOptions = {
  type: 'better-sqlite3',
  synchronize: false,
  database: path.resolve(process.cwd(), 'data/dev.sqlite'),
  entities: [
    path.resolve(__dirname, '**/*.entity{.ts,.js}'),
    path.resolve(__dirname, 'data/entities/*{.ts,.js}'),
  ],
  migrations: [path.resolve(__dirname, 'data/migrations/**/*{.ts,.js}')],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
};

const AppDataSource = new DataSource(dataSourceSettings);

export default AppDataSource;
