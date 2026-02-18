import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1771503794402 implements MigrationInterface {
    name = 'Migration1771503794402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_wishlist" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "description" text NOT NULL, "accountId" text)`);
        await queryRunner.query(`INSERT INTO "temporary_wishlist"("id", "name", "description", "accountId") SELECT "id", "name", "description", "accountId" FROM "wishlist"`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
        await queryRunner.query(`ALTER TABLE "temporary_wishlist" RENAME TO "wishlist"`);
        await queryRunner.query(`CREATE TABLE "temporary_wishlist" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "description" text NOT NULL, "userId" text)`);
        await queryRunner.query(`INSERT INTO "temporary_wishlist"("id", "name", "description", "userId") SELECT "id", "name", "description", "accountId" FROM "wishlist"`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
        await queryRunner.query(`ALTER TABLE "temporary_wishlist" RENAME TO "wishlist"`);
        await queryRunner.query(`CREATE TABLE "temporary_wishlist" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "description" text NOT NULL, "userId" text, CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_wishlist"("id", "name", "description", "userId") SELECT "id", "name", "description", "userId" FROM "wishlist"`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
        await queryRunner.query(`ALTER TABLE "temporary_wishlist" RENAME TO "wishlist"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist" RENAME TO "temporary_wishlist"`);
        await queryRunner.query(`CREATE TABLE "wishlist" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "description" text NOT NULL, "userId" text)`);
        await queryRunner.query(`INSERT INTO "wishlist"("id", "name", "description", "userId") SELECT "id", "name", "description", "userId" FROM "temporary_wishlist"`);
        await queryRunner.query(`DROP TABLE "temporary_wishlist"`);
        await queryRunner.query(`ALTER TABLE "wishlist" RENAME TO "temporary_wishlist"`);
        await queryRunner.query(`CREATE TABLE "wishlist" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "description" text NOT NULL, "accountId" text)`);
        await queryRunner.query(`INSERT INTO "wishlist"("id", "name", "description", "accountId") SELECT "id", "name", "description", "userId" FROM "temporary_wishlist"`);
        await queryRunner.query(`DROP TABLE "temporary_wishlist"`);
        await queryRunner.query(`ALTER TABLE "wishlist" RENAME TO "temporary_wishlist"`);
        await queryRunner.query(`CREATE TABLE "wishlist" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(500) NOT NULL, "description" text NOT NULL, "accountId" text, CONSTRAINT "FK_0cb875f467b33098f3602a31898" FOREIGN KEY ("accountId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "wishlist"("id", "name", "description", "accountId") SELECT "id", "name", "description", "accountId" FROM "temporary_wishlist"`);
        await queryRunner.query(`DROP TABLE "temporary_wishlist"`);
    }

}
