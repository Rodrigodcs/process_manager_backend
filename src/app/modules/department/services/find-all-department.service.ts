import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';

@Injectable()
export class FindAllDepartmentService {
    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
    ) { }

    async run(): Promise<Department[]> {
        const departments = await this.departmentRepository
            .createQueryBuilder('department')
            .leftJoinAndSelect(
                'department.processes',
                'process',
                'process.parentId IS NULL',
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
            .orderBy('department.createdAt', 'DESC')
            .getMany();

        return departments;
    }
}

