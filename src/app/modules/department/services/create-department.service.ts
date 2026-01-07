import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { Department } from '../entities/department.entity';

@Injectable()
export class CreateDepartmentService {
    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
    ) { }

    async run(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        const existingDepartment = await this.departmentRepository.findOne({
            where: { code: createDepartmentDto.code },
        });

        if (existingDepartment) {
            throw new ConflictException(
                `A department with code ${createDepartmentDto.code} already exists`,
            );
        }

        const department = this.departmentRepository.create(createDepartmentDto);
        return await this.departmentRepository.save(department);
    }
}

