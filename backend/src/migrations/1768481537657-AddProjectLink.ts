import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectLink1768481537657 implements MigrationInterface {
    name = 'AddProjectLink1768481537657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "link" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "link"`);
    }

}
