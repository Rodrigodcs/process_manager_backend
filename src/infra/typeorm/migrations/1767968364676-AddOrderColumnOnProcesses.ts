import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddOrderColumnOnProcesses1767968364676 implements MigrationInterface {
    name = 'AddOrderColumnOnProcesses1767968364676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'processes',
            new TableColumn({
                name: 'order',
                type: 'integer',
                isNullable: true,
                default: 0,
            })
        );

        await queryRunner.query(`
            UPDATE processes 
            SET "order" = sub.row_num - 1
            FROM (
                SELECT id, 
                       ROW_NUMBER() OVER (PARTITION BY parent_id ORDER BY created_at) as row_num
                FROM processes
            ) sub
            WHERE processes.id = sub.id
        `);

        await queryRunner.query(`
            ALTER TABLE processes 
            ALTER COLUMN "order" SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('processes', 'order');
    }

}
