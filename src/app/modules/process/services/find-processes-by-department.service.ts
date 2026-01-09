import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { Department } from '../../department/entities/department.entity';
import { ListProcessesByDepartmentDto } from '../dto/list-processes-by-department.dto';
import { Process } from '../entities/process.entity';

@Injectable()
export class FindProcessesByDepartmentService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
    ) { }

    async run(
        departmentId: string,
        listProcessesByDepartmentDto: ListProcessesByDepartmentDto,
    ): Promise<PaginatedResponseDto<Process>> {
        const department = await this.departmentRepository.findOne({
            where: { id: departmentId },
        });

        if (!department) {
            throw new NotFoundException(
                `Department with ID ${departmentId} not found`,
            );
        }

        const { page = 1, limit = 10 } = listProcessesByDepartmentDto;
        const skip = (page - 1) * limit;

        const [data, total] = await this.processRepository.findAndCount({
            where: {
                departmentId,
                parentId: IsNull(),
            },
            relations: ['department', 'children'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });

        const processesWithChildrenIds = data.map(process => ({
            ...process,
            childrenIds: process.children?.map(child => child.id) || [],
        }));

        const totalPages = Math.ceil(total / limit);

        return {
            data: processesWithChildrenIds as any,
            meta: {
                page,
                limit,
                total,
                totalPages,
                hasPreviousPage: page > 1,
                hasNextPage: page < totalPages,
            },
        };
    }
}

