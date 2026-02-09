import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1770657823055 implements MigrationInterface {
  name = 'Migration1770657823055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "description" text NOT NULL, "link" text NOT NULL, "photoLink" text NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "category_items_item" ("categoryId" integer NOT NULL, "itemId" integer NOT NULL, PRIMARY KEY ("categoryId", "itemId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_becf9a6b24d05427493ec8e10a" ON "category_items_item" ("categoryId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0c7765c3c616c51e8ad3f373bb" ON "category_items_item" ("itemId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_becf9a6b24d05427493ec8e10a"`);
    await queryRunner.query(`DROP INDEX "IDX_0c7765c3c616c51e8ad3f373bb"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_category_items_item" ("categoryId" integer NOT NULL, "itemId" integer NOT NULL, CONSTRAINT "FK_becf9a6b24d05427493ec8e10a0" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_0c7765c3c616c51e8ad3f373bba" FOREIGN KEY ("itemId") REFERENCES "item" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("categoryId", "itemId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_category_items_item"("categoryId", "itemId") SELECT "categoryId", "itemId" FROM "category_items_item"`,
    );
    await queryRunner.query(`DROP TABLE "category_items_item"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_category_items_item" RENAME TO "category_items_item"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_becf9a6b24d05427493ec8e10a" ON "category_items_item" ("categoryId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0c7765c3c616c51e8ad3f373bb" ON "category_items_item" ("itemId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_0c7765c3c616c51e8ad3f373bb"`);
    await queryRunner.query(`DROP INDEX "IDX_becf9a6b24d05427493ec8e10a"`);
    await queryRunner.query(
      `ALTER TABLE "category_items_item" RENAME TO "temporary_category_items_item"`,
    );
    await queryRunner.query(
      `CREATE TABLE "category_items_item" ("categoryId" integer NOT NULL, "itemId" integer NOT NULL, PRIMARY KEY ("categoryId", "itemId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "category_items_item"("categoryId", "itemId") SELECT "categoryId", "itemId" FROM "temporary_category_items_item"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_category_items_item"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_0c7765c3c616c51e8ad3f373bb" ON "category_items_item" ("itemId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_becf9a6b24d05427493ec8e10a" ON "category_items_item" ("categoryId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_0c7765c3c616c51e8ad3f373bb"`);
    await queryRunner.query(`DROP INDEX "IDX_becf9a6b24d05427493ec8e10a"`);
    await queryRunner.query(`DROP TABLE "category_items_item"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
