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
import { CreateDocumentDto } from '../dto/create-document.dto';
import { FindAllDocumentsDto } from '../dto/find-all-documents.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { Document } from '../entities/document.entity';
import { CreateDocumentService } from '../services/create-document.service';
import { FindAllDocumentsService } from '../services/find-all-documents.service';
import { FindOneDocumentService } from '../services/find-one-document.service';
import { RemoveDocumentService } from '../services/remove-document.service';
import { UpdateDocumentService } from '../services/update-document.service';

@ApiTags('documents')
@Controller('documents')
export class DocumentController {
    constructor(
        private readonly createDocumentService: CreateDocumentService,
        private readonly findAllDocumentsService: FindAllDocumentsService,
        private readonly findOneDocumentService: FindOneDocumentService,
        private readonly updateDocumentService: UpdateDocumentService,
        private readonly removeDocumentService: RemoveDocumentService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new document' })
    @ApiCreatedResponse({
        description: 'Document created successfully',
        type: Document,
    })
    async create(@Body() createDocumentDto: CreateDocumentDto) {
        return await this.createDocumentService.run(createDocumentDto);
    }

    @Get()
    @ApiOperation({
        summary: 'List all documents with optional search and pagination',
        description: 'Search documents by title with pagination support',
    })
    @ApiOkResponse({
        description: 'Paginated documents list returned successfully',
        type: PaginatedResponseDto,
    })
    async findAll(@Query() findAllDocumentsDto: FindAllDocumentsDto): Promise<PaginatedResponseDto<Document>> {
        return await this.findAllDocumentsService.run(findAllDocumentsDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a document by ID' })
    @ApiParam({ name: 'id', description: 'Document ID (UUID)' })
    @ApiOkResponse({
        description: 'Document found',
        type: Document,
    })
    @ApiNotFoundResponse({ description: 'Document not found' })
    async findOne(@Param('id') id: string) {
        return await this.findOneDocumentService.run(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a document' })
    @ApiParam({ name: 'id', description: 'Document ID (UUID)' })
    @ApiOkResponse({
        description: 'Document updated successfully',
        type: Document,
    })
    @ApiNotFoundResponse({ description: 'Document not found' })
    async update(
        @Param('id') id: string,
        @Body() updateDocumentDto: UpdateDocumentDto,
    ) {
        return await this.updateDocumentService.run(id, updateDocumentDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remove a document' })
    @ApiParam({ name: 'id', description: 'Document ID (UUID)' })
    @ApiNoContentResponse({ description: 'Document removed successfully' })
    @ApiNotFoundResponse({ description: 'Document not found' })
    async remove(@Param('id') id: string) {
        await this.removeDocumentService.run(id);
    }
}

