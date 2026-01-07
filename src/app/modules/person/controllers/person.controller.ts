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
import { CreatePersonDto } from '../dto/create-person.dto';
import { FindAllPeopleDto } from '../dto/find-all-people.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { Person } from '../entities/person.entity';
import { CreatePersonService } from '../services/create-person.service';
import { FindAllPeopleService } from '../services/find-all-people.service';
import { FindOnePersonService } from '../services/find-one-person.service';
import { RemovePersonService } from '../services/remove-person.service';
import { UpdatePersonService } from '../services/update-person.service';

@ApiTags('people')
@Controller('people')
export class PersonController {
    constructor(
        private readonly createPersonService: CreatePersonService,
        private readonly findAllPeopleService: FindAllPeopleService,
        private readonly findOnePersonService: FindOnePersonService,
        private readonly updatePersonService: UpdatePersonService,
        private readonly removePersonService: RemovePersonService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new person' })
    @ApiCreatedResponse({
        description: 'Person created successfully',
        type: Person,
    })
    async create(@Body() createPersonDto: CreatePersonDto) {
        return await this.createPersonService.run(createPersonDto);
    }

    @Get()
    @ApiOperation({
        summary: 'List all people with optional search and pagination',
        description: 'Search people by name with pagination support',
    })
    @ApiOkResponse({
        description: 'Paginated people list returned successfully',
        type: PaginatedResponseDto,
    })
    async findAll(@Query() findAllPeopleDto: FindAllPeopleDto): Promise<PaginatedResponseDto<Person>> {
        return await this.findAllPeopleService.run(findAllPeopleDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a person by ID' })
    @ApiParam({ name: 'id', description: 'Person ID (UUID)' })
    @ApiOkResponse({
        description: 'Person found',
        type: Person,
    })
    @ApiNotFoundResponse({ description: 'Person not found' })
    async findOne(@Param('id') id: string) {
        return await this.findOnePersonService.run(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a person' })
    @ApiParam({ name: 'id', description: 'Person ID (UUID)' })
    @ApiOkResponse({
        description: 'Person updated successfully',
        type: Person,
    })
    @ApiNotFoundResponse({ description: 'Person not found' })
    async update(
        @Param('id') id: string,
        @Body() updatePersonDto: UpdatePersonDto,
    ) {
        return await this.updatePersonService.run(id, updatePersonDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remove a person' })
    @ApiParam({ name: 'id', description: 'Person ID (UUID)' })
    @ApiNoContentResponse({ description: 'Person removed successfully' })
    @ApiNotFoundResponse({ description: 'Person not found' })
    async remove(@Param('id') id: string) {
        await this.removePersonService.run(id);
    }
}

