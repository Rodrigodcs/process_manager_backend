import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Department } from '../entities/department.entity';
import { FindOneDepartmentService } from './find-one-department.service';

@Injectable()
export class UpdateDepartmentService {
    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
        private readonly findOneDepartmentService: FindOneDepartmentService,
    ) { }

    async run(
        id: string,
        updateDepartmentDto: UpdateDepartmentDto,
    ): Promise<Department> {
        const department = await this.findOneDepartmentService.run(id);

        if (updateDepartmentDto.code && updateDepartmentDto.code !== department.code) {
            const existingDepartment = await this.departmentRepository.findOne({
                where: { code: updateDepartmentDto.code },
            });

            if (existingDepartment) {
                throw new ConflictException(
                    `A department with code ${updateDepartmentDto.code} already exists`,
                );
            }
        }

        Object.assign(department, updateDepartmentDto);
        return await this.departmentRepository.save(department);
    }
}

