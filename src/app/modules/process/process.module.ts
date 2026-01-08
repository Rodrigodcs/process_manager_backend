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
import { CreateProcessService } from './services/create-process.service';
import { FindAllProcessService } from './services/find-all-process.service';
import { FindOneProcessService } from './services/find-one-process.service';
import { FindProcessChildrenService } from './services/find-process-children.service';
import { FindProcessesByDepartmentService } from './services/find-processes-by-department.service';
import { AddDocumentsToProcessService } from './services/process-documents/add-documents-to-process.service';
import { ListProcessDocumentsService } from './services/process-documents/list-process-documents.service';
import { RemoveDocumentFromProcessService } from './services/process-documents/remove-document-from-process.service';
import { AddPeopleToProcessService } from './services/process-people/add-people-to-process.service';
import { ListProcessPeopleService } from './services/process-people/list-process-people.service';
import { RemovePersonFromProcessService } from './services/process-people/remove-person-from-process.service';
import { AddToolsToProcessService } from './services/process-tools/add-tools-to-process.service';
import { ListProcessToolsService } from './services/process-tools/list-process-tools.service';
import { RemoveToolFromProcessService } from './services/process-tools/remove-tool-from-process.service';
import { RemoveProcessService } from './services/remove-process.service';
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
        FindProcessChildrenService,
        FindProcessesByDepartmentService,
        UpdateProcessService,
        RemoveProcessService,
        AddPeopleToProcessService,
        RemovePersonFromProcessService,
        ListProcessPeopleService,
        AddToolsToProcessService,
        RemoveToolFromProcessService,
        ListProcessToolsService,
        AddDocumentsToProcessService,
        RemoveDocumentFromProcessService,
        ListProcessDocumentsService,
    ],
    exports: [],
})
export class ProcessModule { }

