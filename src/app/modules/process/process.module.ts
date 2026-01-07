import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../department/entities/department.entity';
import { Document } from '../document/entities/document.entity';
import { Person } from '../person/entities/person.entity';
import { Tool } from '../tool/entities/tool.entity';
import { ProcessController } from './controllers/process.controller';
import { ProcessDocument } from './entities/process-document';
import { ProcessPerson } from './entities/process-person';
import { ProcessTool } from './entities/process-tool';
import { Process } from './entities/process.entity';
import { AddDocumentToProcessService } from './services/add-document-to-process.service';
import { AddPersonToProcessService } from './services/add-person-to-process.service';
import { AddToolToProcessService } from './services/add-tool-to-process.service';
import { CreateProcessService } from './services/create-process.service';
import { FindAllProcessService } from './services/find-all-process.service';
import { FindOneProcessService } from './services/find-one-process.service';
import { FindProcessesByDepartmentService } from './services/find-processes-by-department.service';
import { ListProcessDocumentsService } from './services/list-process-documents.service';
import { ListProcessPeopleService } from './services/list-process-people.service';
import { ListProcessToolsService } from './services/list-process-tools.service';
import { RemoveDocumentFromProcessService } from './services/remove-document-from-process.service';
import { RemovePersonFromProcessService } from './services/remove-person-from-process.service';
import { RemoveProcessService } from './services/remove-process.service';
import { RemoveToolFromProcessService } from './services/remove-tool-from-process.service';
import { UpdateProcessService } from './services/update-process.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Process,
            Department,
            Person,
            Tool,
            Document,
            ProcessPerson,
            ProcessTool,
            ProcessDocument,
        ]),
    ],
    controllers: [ProcessController],
    providers: [
        CreateProcessService,
        FindAllProcessService,
        FindOneProcessService,
        FindProcessesByDepartmentService,
        UpdateProcessService,
        RemoveProcessService,
        AddPersonToProcessService,
        RemovePersonFromProcessService,
        ListProcessPeopleService,
        AddToolToProcessService,
        RemoveToolFromProcessService,
        ListProcessToolsService,
        AddDocumentToProcessService,
        RemoveDocumentFromProcessService,
        ListProcessDocumentsService,
    ],
    exports: [
        CreateProcessService,
        FindAllProcessService,
        FindOneProcessService,
        FindProcessesByDepartmentService,
        UpdateProcessService,
        RemoveProcessService,
        AddPersonToProcessService,
        RemovePersonFromProcessService,
        ListProcessPeopleService,
        AddToolToProcessService,
        RemoveToolFromProcessService,
        ListProcessToolsService,
        AddDocumentToProcessService,
        RemoveDocumentFromProcessService,
        ListProcessDocumentsService,
    ],
})
export class ProcessModule { }

