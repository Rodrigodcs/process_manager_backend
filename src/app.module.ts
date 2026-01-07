import { Module } from '@nestjs/common';
import { DepartmentModule } from './app/modules/department/department.module';
import { DocumentModule } from './app/modules/document/document.module';
import { PersonModule } from './app/modules/person/person.module';
import { ProcessModule } from './app/modules/process/process.module';
import { ToolModule } from './app/modules/tool/tool.module';
import { TypeormModule } from './infra/typeorm/typeorm.module';

@Module({
  imports: [TypeormModule, DepartmentModule, ProcessModule, ToolModule, PersonModule, DocumentModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
