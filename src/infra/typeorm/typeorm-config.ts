import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Department } from 'src/app/modules/department/entities/department.entity';
import { ProcessDocument } from 'src/app/modules/process/entities/process-document';
import { ProcessPerson } from 'src/app/modules/process/entities/process-person';
import { ProcessTool } from 'src/app/modules/process/entities/process-tool';
import { Document } from '../../app/modules/document/entities/document.entity';
import { Person } from '../../app/modules/person/entities/person.entity';
import { Process } from '../../app/modules/process/entities/process.entity';
import { Tool } from '../../app/modules/tool/entities/tool.entity';
import { ormEnvConfig } from '../../environment';

export const getTypeormConfig = (): TypeOrmModuleOptions => {
    console.log(ormEnvConfig);
    return {
        type: 'postgres',
        host: ormEnvConfig.HOST,
        port: ormEnvConfig.PORT ? Number(ormEnvConfig.PORT) : 5432,
        username: ormEnvConfig.USERNAME,
        password: ormEnvConfig.PASSWORD,
        database: ormEnvConfig.DATABASE,
        entities: [Department, Process, Tool, Person, Document, ProcessDocument, ProcessPerson, ProcessTool],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: false,
        synchronize: false,
        logging: true,
    };
};


