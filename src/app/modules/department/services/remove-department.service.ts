import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { FindOneDepartmentService } from './find-one-department.service';

@Injectable()
export class RemoveDepartmentService {
    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
        private readonly findOneDepartmentService: FindOneDepartmentService,
    ) { }

    async run(id: string): Promise<void> {
        const department = await this.findOneDepartmentService.run(id);
        await this.departmentRepository.remove(department);
    }
}

