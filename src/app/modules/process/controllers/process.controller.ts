import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { Document } from '../../document/entities/document.entity';
import { Person } from '../../person/entities/person.entity';
import { Tool } from '../../tool/entities/tool.entity';
import { CreateProcessDto } from '../dto/create-process.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateProcessDto } from '../dto/update-process.dto';
import { Process } from '../entities/process.entity';
import { AddDocumentToProcessService } from '../services/add-document-to-process.service';
import { AddPersonToProcessService } from '../services/add-person-to-process.service';
import { AddToolToProcessService } from '../services/add-tool-to-process.service';
import { CreateProcessService } from '../services/create-process.service';
import { FindAllProcessService } from '../services/find-all-process.service';
import { FindOneProcessService } from '../services/find-one-process.service';
import { FindProcessesByDepartmentService } from '../services/find-processes-by-department.service';
import { ListProcessDocumentsService } from '../services/list-process-documents.service';
import { ListProcessPeopleService } from '../services/list-process-people.service';
import { ListProcessToolsService } from '../services/list-process-tools.service';
import { RemoveDocumentFromProcessService } from '../services/remove-document-from-process.service';
import { RemovePersonFromProcessService } from '../services/remove-person-from-process.service';
import { RemoveProcessService } from '../services/remove-process.service';
import { RemoveToolFromProcessService } from '../services/remove-tool-from-process.service';
import { UpdateProcessService } from '../services/update-process.service';

@ApiTags('processes')
@Controller('processes')
export class ProcessController {
    constructor(
        private readonly createProcessService: CreateProcessService,
        private readonly findAllProcessService: FindAllProcessService,
        private readonly findOneProcessService: FindOneProcessService,
        private readonly findProcessesByDepartmentService: FindProcessesByDepartmentService,
        private readonly updateProcessService: UpdateProcessService,
        private readonly removeProcessService: RemoveProcessService,
        private readonly addPersonToProcessService: AddPersonToProcessService,
        private readonly removePersonFromProcessService: RemovePersonFromProcessService,
        private readonly listProcessPeopleService: ListProcessPeopleService,
        private readonly addToolToProcessService: AddToolToProcessService,
        private readonly removeToolFromProcessService: RemoveToolFromProcessService,
        private readonly listProcessToolsService: ListProcessToolsService,
        private readonly addDocumentToProcessService: AddDocumentToProcessService,
        private readonly removeDocumentFromProcessService: RemoveDocumentFromProcessService,
        private readonly listProcessDocumentsService: ListProcessDocumentsService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new process' })
    @ApiCreatedResponse({
        description: 'Process created successfully',
        type: Process,
    })
    async create(@Body() createProcessDto: CreateProcessDto) {
        return await this.createProcessService.run(createProcessDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all processes' })
    @ApiOkResponse({
        description: 'Processes list returned successfully',
        type: [Process],
    })
    async findAll() {
        return await this.findAllProcessService.run();
    }

    @Get('department/:departmentId')
    @ApiOperation({
        summary: 'Find main processes of a department (paginated)',
        description: 'Returns only main processes (without parentId) of a specific department with pagination',
    })
    @ApiParam({ name: 'departmentId', description: 'Department ID (UUID)' })
    @ApiOkResponse({
        description: 'Paginated list of main processes from the department',
        type: PaginatedResponseDto,
    })
    @ApiNotFoundResponse({ description: 'Department not found' })
    async findByDepartment(
        @Param('departmentId') departmentId: string,
        @Query() paginationDto: PaginationDto,
    ): Promise<PaginatedResponseDto<Process>> {
        return await this.findProcessesByDepartmentService.run(
            departmentId,
            paginationDto,
        );
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a process by ID' })
    @ApiParam({ name: 'id', description: 'Process ID (UUID)' })
    @ApiOkResponse({
        description: 'Process found',
        type: Process,
    })
    @ApiNotFoundResponse({ description: 'Process not found' })
    async findOne(@Param('id') id: string) {
        return await this.findOneProcessService.run(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a process' })
    @ApiParam({ name: 'id', description: 'Process ID (UUID)' })
    @ApiOkResponse({
        description: 'Process updated successfully',
        type: Process,
    })
    @ApiNotFoundResponse({ description: 'Process not found' })
    async update(
        @Param('id') id: string,
        @Body() updateProcessDto: UpdateProcessDto,
    ) {
        return await this.updateProcessService.run(id, updateProcessDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remove a process' })
    @ApiParam({ name: 'id', description: 'Process ID (UUID)' })
    @ApiNoContentResponse({ description: 'Process removed successfully' })
    @ApiNotFoundResponse({ description: 'Process not found' })
    async remove(@Param('id') id: string) {
        await this.removeProcessService.run(id);
    }

    @Post(':processId/people/:personId')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Link a person to a process' })
    @ApiParam({ name: 'processId', description: 'Process ID (UUID)' })
    @ApiParam({ name: 'personId', description: 'Person ID (UUID)' })
    @ApiCreatedResponse({ description: 'Person linked to process successfully' })
    @ApiNotFoundResponse({ description: 'Process or Person not found' })
    async addPersonToProcess(
        @Param('processId') processId: string,
        @Param('personId') personId: string,
    ) {
        return await this.addPersonToProcessService.run(processId, personId);
    }

    @Delete(':processId/people/:personId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Unlink a person from a process' })
    @ApiParam({ name: 'processId', description: 'Process ID (UUID)' })
    @ApiParam({ name: 'personId', description: 'Person ID (UUID)' })
    @ApiNoContentResponse({ description: 'Person unlinked from process successfully' })
    @ApiNotFoundResponse({ description: 'Person is not linked to this process' })
    async removePersonFromProcess(
        @Param('processId') processId: string,
        @Param('personId') personId: string,
    ) {
        await this.removePersonFromProcessService.run(processId, personId);
    }

    @Get(':processId/people')
    @ApiOperation({ summary: 'List all people linked to a process' })
    @ApiParam({ name: 'processId', description: 'Process ID (UUID)' })
    @ApiOkResponse({
        description: 'List of people linked to the process',
        type: [Person],
    })
    @ApiNotFoundResponse({ description: 'Process not found' })
    async listProcessPeople(@Param('processId') processId: string) {
        return await this.listProcessPeopleService.run(processId);
    }

    @Post(':processId/tools/:toolId')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Link a tool to a process' })
    @ApiParam({ name: 'processId', description: 'Process ID (UUID)' })
    @ApiParam({ name: 'toolId', description: 'Tool ID (UUID)' })
    @ApiCreatedResponse({ description: 'Tool linked to process successfully' })
    @ApiNotFoundResponse({ description: 'Process or Tool not found' })
    async addToolToProcess(
        @Param('processId') processId: string,
        @Param('toolId') toolId: string,
    ) {
        return await this.addToolToProcessService.run(processId, toolId);
    }

    @Delete(':processId/tools/:toolId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Unlink a tool from a process' })
    @ApiParam({ name: 'processId', description: 'Process ID (UUID)' })
    @ApiParam({ name: 'toolId', description: 'Tool ID (UUID)' })
    @ApiNoContentResponse({ description: 'Tool unlinked from process successfully' })
    @ApiNotFoundResponse({ description: 'Tool is not linked to this process' })
    async removeToolFromProcess(
        @Param('processId') processId: string,
        @Param('toolId') toolId: string,
    ) {
        await this.removeToolFromProcessService.run(processId, toolId);
    }

    @Get(':processId/tools')
    @ApiOperation({ summary: 'List all tools linked to a process' })
    @ApiParam({ name: 'processId', description: 'Process ID (UUID)' })
    @ApiOkResponse({
        description: 'List of tools linked to the process',
        type: [Tool],
    })
    @ApiNotFoundResponse({ description: 'Process not found' })
    async listProcessTools(@Param('processId') processId: string) {
        return await this.listProcessToolsService.run(processId);
    }

    @Post(':processId/documents/:documentId')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Link a document to a process' })
    @ApiParam({ name: 'processId', description: 'Process ID (UUID)' })
    @ApiParam({ name: 'documentId', description: 'Document ID (UUID)' })
    @ApiCreatedResponse({ description: 'Document linked to process successfully' })
    @ApiNotFoundResponse({ description: 'Process or Document not found' })
    async addDocumentToProcess(
        @Param('processId') processId: string,
        @Param('documentId') documentId: string,
    ) {
        return await this.addDocumentToProcessService.run(processId, documentId);
    }

    @Delete(':processId/documents/:documentId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Unlink a document from a process' })
    @ApiParam({ name: 'processId', description: 'Process ID (UUID)' })
    @ApiParam({ name: 'documentId', description: 'Document ID (UUID)' })
    @ApiNoContentResponse({ description: 'Document unlinked from process successfully' })
    @ApiNotFoundResponse({ description: 'Document is not linked to this process' })
    async removeDocumentFromProcess(
        @Param('processId') processId: string,
        @Param('documentId') documentId: string,
    ) {
        await this.removeDocumentFromProcessService.run(processId, documentId);
    }

    @Get(':processId/documents')
    @ApiOperation({ summary: 'List all documents linked to a process' })
    @ApiParam({ name: 'processId', description: 'Process ID (UUID)' })
    @ApiOkResponse({
        description: 'List of documents linked to the process',
        type: [Document],
    })
    @ApiNotFoundResponse({ description: 'Process not found' })
    async listProcessDocuments(@Param('processId') processId: string) {
        return await this.listProcessDocumentsService.run(processId);
    }
}

