import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTables1767883701925 implements MigrationInterface {
    name = 'CreateTables1767883701925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create UUID extension
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);

        // Create ENUM types
        await queryRunner.query(`
            CREATE TYPE "processes_type_enum" AS ENUM ('MANUAL', 'SYSTEMIC');
        `);

        await queryRunner.query(`
            CREATE TYPE "processes_status_enum" AS ENUM ('ACTIVE', 'IN_REVIEW', 'DEPRECATED');
        `);

        // Create departments table
        await queryRunner.createTable(
            new Table({
                name: 'departments',
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
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        length: '100',
                        isUnique: true,
                    },
                    {
                        name: 'color',
                        type: 'varchar',
                        length: '50',
                        default: "'blue'",
                    },
                    {
                        name: 'icon',
                        type: 'varchar',
                        length: '50',
                        default: "'FiFolder'",
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

        // Create processes table
        await queryRunner.createTable(
            new Table({
                name: 'processes',
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
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'type',
                        type: 'processes_type_enum',
                    },
                    {
                        name: 'status',
                        type: 'processes_status_enum',
                    },
                    {
                        name: 'department_id',
                        type: 'uuid',
                    },
                    {
                        name: 'parent_id',
                        type: 'uuid',
                        isNullable: true,
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

        // Create tools table
        await queryRunner.createTable(
            new Table({
                name: 'tools',
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
                        name: 'normalizedName',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'url',
                        type: 'varchar',
                        length: '500',
                        isNullable: true,
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

        // Create people table
        await queryRunner.createTable(
            new Table({
                name: 'people',
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
                        name: 'role',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
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

        // Create documents table
        await queryRunner.createTable(
            new Table({
                name: 'documents',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'url',
                        type: 'varchar',
                        length: '500',
                        isNullable: true,
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

        // Create process_documents junction table
        await queryRunner.createTable(
            new Table({
                name: 'process_documents',
                columns: [
                    {
                        name: 'process_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'document_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        // Create process_people junction table
        await queryRunner.createTable(
            new Table({
                name: 'process_people',
                columns: [
                    {
                        name: 'process_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'person_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        // Create process_tools junction table
        await queryRunner.createTable(
            new Table({
                name: 'process_tools',
                columns: [
                    {
                        name: 'process_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'tool_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        // Add foreign keys for processes table
        await queryRunner.createForeignKey(
            'processes',
            new TableForeignKey({
                columnNames: ['department_id'],
                referencedTableName: 'departments',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'processes',
            new TableForeignKey({
                columnNames: ['parent_id'],
                referencedTableName: 'processes',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        // Add foreign keys for process_documents
        await queryRunner.createForeignKey(
            'process_documents',
            new TableForeignKey({
                columnNames: ['process_id'],
                referencedTableName: 'processes',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'process_documents',
            new TableForeignKey({
                columnNames: ['document_id'],
                referencedTableName: 'documents',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        // Add foreign keys for process_people
        await queryRunner.createForeignKey(
            'process_people',
            new TableForeignKey({
                columnNames: ['process_id'],
                referencedTableName: 'processes',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'process_people',
            new TableForeignKey({
                columnNames: ['person_id'],
                referencedTableName: 'people',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        // Add foreign keys for process_tools
        await queryRunner.createForeignKey(
            'process_tools',
            new TableForeignKey({
                columnNames: ['process_id'],
                referencedTableName: 'processes',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'process_tools',
            new TableForeignKey({
                columnNames: ['tool_id'],
                referencedTableName: 'tools',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys
        const processDocumentsTable = await queryRunner.getTable('process_documents');
        if (processDocumentsTable) {
            const foreignKeys = processDocumentsTable.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey('process_documents', foreignKey);
            }
        }

        const processPeopleTable = await queryRunner.getTable('process_people');
        if (processPeopleTable) {
            const foreignKeys = processPeopleTable.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey('process_people', foreignKey);
            }
        }

        const processToolsTable = await queryRunner.getTable('process_tools');
        if (processToolsTable) {
            const foreignKeys = processToolsTable.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey('process_tools', foreignKey);
            }
        }

        const processesTable = await queryRunner.getTable('processes');
        if (processesTable) {
            const foreignKeys = processesTable.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey('processes', foreignKey);
            }
        }

        // Drop junction tables
        await queryRunner.dropTable('process_tools', true);
        await queryRunner.dropTable('process_people', true);
        await queryRunner.dropTable('process_documents', true);

        // Drop main tables
        await queryRunner.dropTable('documents', true);
        await queryRunner.dropTable('people', true);
        await queryRunner.dropTable('tools', true);
        await queryRunner.dropTable('processes', true);
        await queryRunner.dropTable('departments', true);

        // Drop ENUM types
        await queryRunner.query(`DROP TYPE IF EXISTS "processes_status_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "processes_type_enum"`);
    }
}
