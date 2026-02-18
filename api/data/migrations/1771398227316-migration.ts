import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1771398227316 implements MigrationInterface {
  name = 'Migration1771398227316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wishlist" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "description" text NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "wishlist_items_item" ("wishlistId" integer NOT NULL, "itemId" integer NOT NULL, PRIMARY KEY ("wishlistId", "itemId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ef7c0770b362b93a466d6c9dbc" ON "wishlist_items_item" ("wishlistId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5b5d935400f3db3ed581c2ab70" ON "wishlist_items_item" ("itemId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_ef7c0770b362b93a466d6c9dbc"`);
    await queryRunner.query(`DROP INDEX "IDX_5b5d935400f3db3ed581c2ab70"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_wishlist_items_item" ("wishlistId" integer NOT NULL, "itemId" integer NOT NULL, CONSTRAINT "FK_ef7c0770b362b93a466d6c9dbc6" FOREIGN KEY ("wishlistId") REFERENCES "wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_5b5d935400f3db3ed581c2ab700" FOREIGN KEY ("itemId") REFERENCES "item" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("wishlistId", "itemId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_wishlist_items_item"("wishlistId", "itemId") SELECT "wishlistId", "itemId" FROM "wishlist_items_item"`,
    );
    await queryRunner.query(`DROP TABLE "wishlist_items_item"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_wishlist_items_item" RENAME TO "wishlist_items_item"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ef7c0770b362b93a466d6c9dbc" ON "wishlist_items_item" ("wishlistId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5b5d935400f3db3ed581c2ab70" ON "wishlist_items_item" ("itemId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_5b5d935400f3db3ed581c2ab70"`);
    await queryRunner.query(`DROP INDEX "IDX_ef7c0770b362b93a466d6c9dbc"`);
    await queryRunner.query(
      `ALTER TABLE "wishlist_items_item" RENAME TO "temporary_wishlist_items_item"`,
    );
    await queryRunner.query(
      `CREATE TABLE "wishlist_items_item" ("wishlistId" integer NOT NULL, "itemId" integer NOT NULL, PRIMARY KEY ("wishlistId", "itemId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "wishlist_items_item"("wishlistId", "itemId") SELECT "wishlistId", "itemId" FROM "temporary_wishlist_items_item"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_wishlist_items_item"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_5b5d935400f3db3ed581c2ab70" ON "wishlist_items_item" ("itemId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ef7c0770b362b93a466d6c9dbc" ON "wishlist_items_item" ("wishlistId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_5b5d935400f3db3ed581c2ab70"`);
    await queryRunner.query(`DROP INDEX "IDX_ef7c0770b362b93a466d6c9dbc"`);
    await queryRunner.query(`DROP TABLE "wishlist_items_item"`);
    await queryRunner.query(`DROP TABLE "wishlist"`);
  }
}
