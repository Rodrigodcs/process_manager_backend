import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { CreateProcessDto } from '../dto/create-process.dto';
import { Process } from '../entities/process.entity';

@Injectable()
export class CreateProcessService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
    ) { }

    async run(createProcessDto: CreateProcessDto): Promise<Process> {
        const department = await this.departmentRepository.findOne({
            where: { id: createProcessDto.departmentId },
        });

        if (!department) {
            throw new NotFoundException(
                `Department with ID ${createProcessDto.departmentId} not found`,
            );
        }

        if (createProcessDto.parentId) {
            const parentProcess = await this.processRepository.findOne({
                where: { id: createProcessDto.parentId },
            });

            if (!parentProcess) {
                throw new NotFoundException(
                    `Parent process with ID ${createProcessDto.parentId} not found`,
                );
            }
        }

        const process = this.processRepository.create(createProcessDto);
        return await this.processRepository.save(process);
    }
}

