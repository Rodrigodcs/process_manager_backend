import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1767883816706 implements MigrationInterface {
    name = 'CreateUserTable1767883816706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'color',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                        default: "'blue'",
                    },
                    {
                        name: 'icon',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                        default: "'FiUser'",
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: 'now()',
                    },
                ],
            }),
            true,
        );

        await queryRunner.query(`
            CREATE INDEX "idx_users_email" ON "users" ("email");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_users_email"`);

        await queryRunner.dropTable('users', true);
    }

}
