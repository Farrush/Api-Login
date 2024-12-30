import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1735586432225 implements MigrationInterface {
    name = 'Default1735586432225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "pass" text NOT NULL, CONSTRAINT "UQ_a1fa377d7cba456bebaa6922edf" UNIQUE ("email"), CONSTRAINT "PK_0e29aa96b7d3fb812ff43fcfcd3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "login"`);
    }

}
