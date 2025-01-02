import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1735819073175 implements MigrationInterface {
    name = 'Default1735819073175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "token" text NOT NULL, "createdAt" date NOT NULL, "loginId" integer, CONSTRAINT "REL_bfca3587e21a2e4dab77840f0e" UNIQUE ("loginId"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_bfca3587e21a2e4dab77840f0e3" FOREIGN KEY ("loginId") REFERENCES "login"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_bfca3587e21a2e4dab77840f0e3"`);
        await queryRunner.query(`DROP TABLE "token"`);
    }

}
