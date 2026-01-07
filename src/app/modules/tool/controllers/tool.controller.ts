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
import { CreateToolDto } from '../dto/create-tool.dto';
import { FindAllToolsDto } from '../dto/find-all-tools.dto';
import { UpdateToolDto } from '../dto/update-tool.dto';
import { Tool } from '../entities/tool.entity';
import { CreateToolService } from '../services/create-tool.service';
import { FindAllToolsService } from '../services/find-all-tools.service';
import { FindOneToolService } from '../services/find-one-tool.service';
import { RemoveToolService } from '../services/remove-tool.service';
import { UpdateToolService } from '../services/update-tool.service';

@ApiTags('tools')
@Controller('tools')
export class ToolController {
    constructor(
        private readonly createToolService: CreateToolService,
        private readonly findAllToolsService: FindAllToolsService,
        private readonly findOneToolService: FindOneToolService,
        private readonly updateToolService: UpdateToolService,
        private readonly removeToolService: RemoveToolService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new tool' })
    @ApiCreatedResponse({
        description: 'Tool created successfully',
        type: Tool,
    })
    async create(@Body() createToolDto: CreateToolDto) {
        return await this.createToolService.run(createToolDto);
    }

    @Get()
    @ApiOperation({
        summary: 'List all tools with optional search and pagination',
        description: 'Search tools by normalized name (case insensitive) with pagination support',
    })
    @ApiOkResponse({
        description: 'Paginated tools list returned successfully',
        type: PaginatedResponseDto,
    })
    async findAll(@Query() findAllToolsDto: FindAllToolsDto): Promise<PaginatedResponseDto<Tool>> {
        return await this.findAllToolsService.run(findAllToolsDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a tool by ID' })
    @ApiParam({ name: 'id', description: 'Tool ID (UUID)' })
    @ApiOkResponse({
        description: 'Tool found',
        type: Tool,
    })
    @ApiNotFoundResponse({ description: 'Tool not found' })
    async findOne(@Param('id') id: string) {
        return await this.findOneToolService.run(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a tool' })
    @ApiParam({ name: 'id', description: 'Tool ID (UUID)' })
    @ApiOkResponse({
        description: 'Tool updated successfully',
        type: Tool,
    })
    @ApiNotFoundResponse({ description: 'Tool not found' })
    async update(
        @Param('id') id: string,
        @Body() updateToolDto: UpdateToolDto,
    ) {
        return await this.updateToolService.run(id, updateToolDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remove a tool' })
    @ApiParam({ name: 'id', description: 'Tool ID (UUID)' })
    @ApiNoContentResponse({ description: 'Tool removed successfully' })
    @ApiNotFoundResponse({ description: 'Tool not found' })
    async remove(@Param('id') id: string) {
        await this.removeToolService.run(id);
    }
}

