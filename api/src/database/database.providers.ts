import { DataSource } from 'typeorm';
import * as path from 'path';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'better-sqlite3',
        database: path.join(__dirname, '../../data/dev.sqlite'),

        // Your existing entities + Better Auth generated entities
        entities: [
          path.join(__dirname, '/../**/*.entity{.ts,.js}'),
          path.join(process.cwd(), 'typeorm/entities/**/*{.ts,.js}'),
        ],

        // Better Auth generated migrations
        migrations: [
          path.join(process.cwd(), 'typeorm/migrations/**/*{.ts,.js}'),
        ],
        migrationsRun: true,

        // Prefer migrations over synchronize once you have data
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
