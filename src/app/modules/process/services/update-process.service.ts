import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { UpdateProcessDto } from '../dto/update-process.dto';
import { Process } from '../entities/process.entity';
import { FindOneProcessService } from './find-one-process.service';

@Injectable()
export class UpdateProcessService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
        private readonly findOneProcessService: FindOneProcessService,
    ) { }

    async run(
        id: string,
        updateProcessDto: UpdateProcessDto,
    ): Promise<Process> {
        const process = await this.findOneProcessService.run(id);

        if (updateProcessDto.departmentId) {
            const department = await this.departmentRepository.findOne({
                where: { id: updateProcessDto.departmentId },
            });

            if (!department) {
                throw new NotFoundException(
                    `Department with ID ${updateProcessDto.departmentId} not found`,
                );
            }
        }

        if (updateProcessDto.parentId !== undefined) {
            if (updateProcessDto.parentId === null) {
                process.parentId = undefined;
            } else {
                const parentProcess = await this.processRepository.findOne({
                    where: { id: updateProcessDto.parentId },
                });

                if (!parentProcess) {
                    throw new NotFoundException(
                        `Parent process with ID ${updateProcessDto.parentId} not found`,
                    );
                }

                if (updateProcessDto.parentId === id) {
                    throw new BadRequestException(
                        'A process cannot be its own parent',
                    );
                }
            }
        }

        const { parentId, ...restUpdateDto } = updateProcessDto;
        Object.assign(process, restUpdateDto);

        if (parentId !== undefined) {
            process.parentId = parentId === null ? undefined : parentId;
        }

        await this.processRepository.save(process);

        // Return updated process with childrenIds
        return await this.findOneProcessService.run(id);
    }
}

