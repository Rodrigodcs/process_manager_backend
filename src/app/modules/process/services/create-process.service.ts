import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
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

        let order = 0;

        if (createProcessDto.parentId) {
            const siblings = await this.processRepository.find({
                where: { parentId: createProcessDto.parentId },
                order: { order: 'DESC' },
                take: 1,
            });

            if (siblings.length > 0) {
                order = siblings[0].order + 1;
            }
        } else {
            const siblings = await this.processRepository.find({
                where: {
                    departmentId: createProcessDto.departmentId,
                    parentId: IsNull(),
                },
                order: { order: 'DESC' },
                take: 1,
            });

            if (siblings.length > 0) {
                order = siblings[0].order + 1;
            }
        }

        const process = this.processRepository.create({
            ...createProcessDto,
            order,
        });
        const savedProcess = await this.processRepository.save(process);

        return {
            ...savedProcess,
            childrenIds: [],
        } as any;
    }
}

