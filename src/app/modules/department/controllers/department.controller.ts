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
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Department } from '../entities/department.entity';
import { CreateDepartmentService } from '../services/create-department.service';
import { FindAllDepartmentService } from '../services/find-all-department.service';
import { FindOneDepartmentService } from '../services/find-one-department.service';
import { RemoveDepartmentService } from '../services/remove-department.service';
import { UpdateDepartmentService } from '../services/update-department.service';

@ApiTags('departments')
@Controller('departments')
export class DepartmentController {
    constructor(
        private readonly createDepartmentService: CreateDepartmentService,
        private readonly findAllDepartmentService: FindAllDepartmentService,
        private readonly findOneDepartmentService: FindOneDepartmentService,
        private readonly updateDepartmentService: UpdateDepartmentService,
        private readonly removeDepartmentService: RemoveDepartmentService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new department' })
    @ApiCreatedResponse({
        description: 'Department created successfully',
        type: Department,
    })
    async create(
        @Body() createDepartmentDto: CreateDepartmentDto,
    ) {
        return await this.createDepartmentService.run(createDepartmentDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all departments' })
    @ApiOkResponse({
        description: 'Departments list returned successfully',
        type: [Department],
    })
    async findAll() {
        return await this.findAllDepartmentService.run();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a department by ID' })
    @ApiParam({ name: 'id', description: 'Department ID (UUID)' })
    @ApiOkResponse({
        description: 'Department found',
        type: Department,
    })
    @ApiNotFoundResponse({ description: 'Department not found' })
    async findOne(@Param('id') id: string) {
        return await this.findOneDepartmentService.run(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a department' })
    @ApiParam({ name: 'id', description: 'Department ID (UUID)' })
    @ApiOkResponse({
        description: 'Department updated successfully',
        type: Department,
    })
    @ApiNotFoundResponse({ description: 'Department not found' })
    async update(
        @Param('id') id: string,
        @Body() updateDepartmentDto: UpdateDepartmentDto,
    ) {
        return await this.updateDepartmentService.run(id, updateDepartmentDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remove a department' })
    @ApiParam({ name: 'id', description: 'Department ID (UUID)' })
    @ApiNoContentResponse({ description: 'Department removed successfully' })
    @ApiNotFoundResponse({ description: 'Department not found' })
    async remove(@Param('id') id: string) {
        await this.removeDepartmentService.run(id);
    }
}

