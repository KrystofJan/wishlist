import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1774521994925 implements MigrationInterface {
    name = 'Migration1774521994925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "apikey" ("id" text PRIMARY KEY NOT NULL, "configId" text NOT NULL DEFAULT ('default'), "name" text, "start" text, "referenceId" text NOT NULL, "prefix" text, "key" text NOT NULL, "refillInterval" integer, "refillAmount" integer, "lastRefillAt" datetime, "enabled" boolean DEFAULT (1), "rateLimitEnabled" boolean DEFAULT (1), "rateLimitTimeWindow" integer DEFAULT (86400000), "rateLimitMax" integer DEFAULT (10), "requestCount" integer DEFAULT (0), "remaining" integer, "lastRequest" datetime, "expiresAt" datetime, "createdAt" datetime NOT NULL, "updatedAt" datetime NOT NULL, "permissions" text, "metadata" text)`);
        await queryRunner.query(`CREATE INDEX "apikey_configId_idx" ON "apikey" ("configId") `);
        await queryRunner.query(`CREATE INDEX "apikey_referenceId_idx" ON "apikey" ("referenceId") `);
        await queryRunner.query(`CREATE INDEX "apikey_key_idx" ON "apikey" ("key") `);
        await queryRunner.query(`CREATE TABLE "temporary_verification" ("id" text PRIMARY KEY NOT NULL, "identifier" text NOT NULL, "value" text NOT NULL, "expiresAt" datetime NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_verification"("id", "identifier", "value", "expiresAt", "createdAt", "updatedAt") SELECT "id", "identifier", "value", "expiresAt", "createdAt", "updatedAt" FROM "verification"`);
        await queryRunner.query(`DROP TABLE "verification"`);
        await queryRunner.query(`ALTER TABLE "temporary_verification" RENAME TO "verification"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "emailVerified" boolean NOT NULL DEFAULT (0), "image" text, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "email", "emailVerified", "image", "createdAt", "updatedAt") SELECT "id", "name", "email", "emailVerified", "image", "createdAt", "updatedAt" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_session" ("id" text PRIMARY KEY NOT NULL, "expiresAt" datetime NOT NULL, "token" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL, "ipAddress" text, "userAgent" text, "userId" text NOT NULL, CONSTRAINT "UQ_232f8e85d7633bd6ddfad421696" UNIQUE ("token"))`);
        await queryRunner.query(`INSERT INTO "temporary_session"("id", "expiresAt", "token", "createdAt", "updatedAt", "ipAddress", "userAgent", "userId") SELECT "id", "expiresAt", "token", "createdAt", "updatedAt", "ipAddress", "userAgent", "userId" FROM "session"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`ALTER TABLE "temporary_session" RENAME TO "session"`);
        await queryRunner.query(`CREATE TABLE "temporary_jwks" ("id" text PRIMARY KEY NOT NULL, "publicKey" text NOT NULL, "privateKey" text NOT NULL, "createdAt" datetime NOT NULL, "expiresAt" datetime)`);
        await queryRunner.query(`INSERT INTO "temporary_jwks"("id", "publicKey", "privateKey", "createdAt", "expiresAt") SELECT "id", "publicKey", "privateKey", "createdAt", "expiresAt" FROM "jwks"`);
        await queryRunner.query(`DROP TABLE "jwks"`);
        await queryRunner.query(`ALTER TABLE "temporary_jwks" RENAME TO "jwks"`);
        await queryRunner.query(`CREATE TABLE "temporary_account" ("id" text PRIMARY KEY NOT NULL, "accountId" text NOT NULL, "providerId" text NOT NULL, "userId" text NOT NULL, "accessToken" text, "refreshToken" text, "idToken" text, "accessTokenExpiresAt" datetime, "refreshTokenExpiresAt" datetime, "scope" text, "password" text, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_account"("id", "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password", "createdAt", "updatedAt") SELECT "id", "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password", "createdAt", "updatedAt" FROM "account"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`ALTER TABLE "temporary_account" RENAME TO "account"`);
        await queryRunner.query(`CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier") `);
        await queryRunner.query(`CREATE INDEX "session_userId_idx" ON "session" ("userId") `);
        await queryRunner.query(`CREATE INDEX "account_userId_idx" ON "account" ("userId") `);
        await queryRunner.query(`DROP INDEX "session_userId_idx"`);
        await queryRunner.query(`CREATE TABLE "temporary_session" ("id" text PRIMARY KEY NOT NULL, "expiresAt" datetime NOT NULL, "token" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL, "ipAddress" text, "userAgent" text, "userId" text NOT NULL, CONSTRAINT "UQ_232f8e85d7633bd6ddfad421696" UNIQUE ("token"), CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_session"("id", "expiresAt", "token", "createdAt", "updatedAt", "ipAddress", "userAgent", "userId") SELECT "id", "expiresAt", "token", "createdAt", "updatedAt", "ipAddress", "userAgent", "userId" FROM "session"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`ALTER TABLE "temporary_session" RENAME TO "session"`);
        await queryRunner.query(`CREATE INDEX "session_userId_idx" ON "session" ("userId") `);
        await queryRunner.query(`DROP INDEX "account_userId_idx"`);
        await queryRunner.query(`CREATE TABLE "temporary_account" ("id" text PRIMARY KEY NOT NULL, "accountId" text NOT NULL, "providerId" text NOT NULL, "userId" text NOT NULL, "accessToken" text, "refreshToken" text, "idToken" text, "accessTokenExpiresAt" datetime, "refreshTokenExpiresAt" datetime, "scope" text, "password" text, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL, CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_account"("id", "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password", "createdAt", "updatedAt") SELECT "id", "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password", "createdAt", "updatedAt" FROM "account"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`ALTER TABLE "temporary_account" RENAME TO "account"`);
        await queryRunner.query(`CREATE INDEX "account_userId_idx" ON "account" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "account_userId_idx"`);
        await queryRunner.query(`ALTER TABLE "account" RENAME TO "temporary_account"`);
        await queryRunner.query(`CREATE TABLE "account" ("id" text PRIMARY KEY NOT NULL, "accountId" text NOT NULL, "providerId" text NOT NULL, "userId" text NOT NULL, "accessToken" text, "refreshToken" text, "idToken" text, "accessTokenExpiresAt" datetime, "refreshTokenExpiresAt" datetime, "scope" text, "password" text, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "account"("id", "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password", "createdAt", "updatedAt") SELECT "id", "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password", "createdAt", "updatedAt" FROM "temporary_account"`);
        await queryRunner.query(`DROP TABLE "temporary_account"`);
        await queryRunner.query(`CREATE INDEX "account_userId_idx" ON "account" ("userId") `);
        await queryRunner.query(`DROP INDEX "session_userId_idx"`);
        await queryRunner.query(`ALTER TABLE "session" RENAME TO "temporary_session"`);
        await queryRunner.query(`CREATE TABLE "session" ("id" text PRIMARY KEY NOT NULL, "expiresAt" datetime NOT NULL, "token" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL, "ipAddress" text, "userAgent" text, "userId" text NOT NULL, CONSTRAINT "UQ_232f8e85d7633bd6ddfad421696" UNIQUE ("token"))`);
        await queryRunner.query(`INSERT INTO "session"("id", "expiresAt", "token", "createdAt", "updatedAt", "ipAddress", "userAgent", "userId") SELECT "id", "expiresAt", "token", "createdAt", "updatedAt", "ipAddress", "userAgent", "userId" FROM "temporary_session"`);
        await queryRunner.query(`DROP TABLE "temporary_session"`);
        await queryRunner.query(`CREATE INDEX "session_userId_idx" ON "session" ("userId") `);
        await queryRunner.query(`DROP INDEX "account_userId_idx"`);
        await queryRunner.query(`DROP INDEX "session_userId_idx"`);
        await queryRunner.query(`DROP INDEX "verification_identifier_idx"`);
        await queryRunner.query(`ALTER TABLE "account" RENAME TO "temporary_account"`);
        await queryRunner.query(`CREATE TABLE "account" ("id" text PRIMARY KEY NOT NULL, "accountId" text NOT NULL, "providerId" text NOT NULL, "userId" text NOT NULL, "accessToken" text, "refreshToken" text, "idToken" text, "accessTokenExpiresAt" date, "refreshTokenExpiresAt" date, "scope" text, "password" text, "createdAt" date NOT NULL, "updatedAt" date NOT NULL)`);
        await queryRunner.query(`INSERT INTO "account"("id", "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password", "createdAt", "updatedAt") SELECT "id", "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password", "createdAt", "updatedAt" FROM "temporary_account"`);
        await queryRunner.query(`DROP TABLE "temporary_account"`);
        await queryRunner.query(`ALTER TABLE "jwks" RENAME TO "temporary_jwks"`);
        await queryRunner.query(`CREATE TABLE "jwks" ("id" text PRIMARY KEY NOT NULL, "publicKey" text NOT NULL, "privateKey" text NOT NULL, "createdAt" date NOT NULL, "expiresAt" date)`);
        await queryRunner.query(`INSERT INTO "jwks"("id", "publicKey", "privateKey", "createdAt", "expiresAt") SELECT "id", "publicKey", "privateKey", "createdAt", "expiresAt" FROM "temporary_jwks"`);
        await queryRunner.query(`DROP TABLE "temporary_jwks"`);
        await queryRunner.query(`ALTER TABLE "session" RENAME TO "temporary_session"`);
        await queryRunner.query(`CREATE TABLE "session" ("id" text PRIMARY KEY NOT NULL, "expiresAt" date NOT NULL, "token" text NOT NULL, "createdAt" date NOT NULL, "updatedAt" date NOT NULL, "ipAddress" text, "userAgent" text, "userId" text NOT NULL, CONSTRAINT "UQ_232f8e85d7633bd6ddfad421696" UNIQUE ("token"))`);
        await queryRunner.query(`INSERT INTO "session"("id", "expiresAt", "token", "createdAt", "updatedAt", "ipAddress", "userAgent", "userId") SELECT "id", "expiresAt", "token", "createdAt", "updatedAt", "ipAddress", "userAgent", "userId" FROM "temporary_session"`);
        await queryRunner.query(`DROP TABLE "temporary_session"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "emailVerified" boolean NOT NULL, "image" text, "createdAt" date NOT NULL, "updatedAt" date NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "email", "emailVerified", "image", "createdAt", "updatedAt") SELECT "id", "name", "email", "emailVerified", "image", "createdAt", "updatedAt" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "verification" RENAME TO "temporary_verification"`);
        await queryRunner.query(`CREATE TABLE "verification" ("id" text PRIMARY KEY NOT NULL, "identifier" text NOT NULL, "value" text NOT NULL, "expiresAt" date NOT NULL, "createdAt" date NOT NULL, "updatedAt" date NOT NULL)`);
        await queryRunner.query(`INSERT INTO "verification"("id", "identifier", "value", "expiresAt", "createdAt", "updatedAt") SELECT "id", "identifier", "value", "expiresAt", "createdAt", "updatedAt" FROM "temporary_verification"`);
        await queryRunner.query(`DROP TABLE "temporary_verification"`);
        await queryRunner.query(`DROP INDEX "apikey_key_idx"`);
        await queryRunner.query(`DROP INDEX "apikey_referenceId_idx"`);
        await queryRunner.query(`DROP INDEX "apikey_configId_idx"`);
        await queryRunner.query(`DROP TABLE "apikey"`);
    }

}
