import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';

@Injectable()
export class FindOneDepartmentService {
    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
    ) { }

    async run(id: string): Promise<Department> {
        const department = await this.departmentRepository
            .createQueryBuilder('department')
            .leftJoinAndSelect(
                'department.processes',
                'process',
                'process.parentId IS NULL', // Only main processes
            )
            .select([
                'department.id',
                'department.name',
                'department.code',
                'department.description',
                'department.color',
                'department.icon',
                'department.createdAt',
                'department.updatedAt',
                'process.id',
                'process.name',
            ])
            .where('department.id = :id', { id })
            .getOne();

        if (!department) {
            throw new NotFoundException(`Department with ID ${id} not found`);
        }

        return department;
    }
}

