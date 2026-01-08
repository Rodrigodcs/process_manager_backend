import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from '../../../tool/entities/tool.entity';
import { Process } from '../../entities/process.entity';

@Injectable()
export class ListProcessToolsService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Tool)
        private readonly toolRepository: Repository<Tool>,
    ) { }

    async run(processId: string): Promise<Tool[]> {
        const process = await this.processRepository.findOne({
            where: { id: processId },
        });

        if (!process) {
            throw new NotFoundException(`Process with ID ${processId} not found`);
        }

        const tools = await this.toolRepository
            .createQueryBuilder('tool')
            .innerJoin('process_tools', 'pt', 'pt.tool_id = tool.id')
            .where('pt.process_id = :processId', { processId })
            .orderBy('tool.name', 'ASC')
            .getMany();

        return tools;
    }
}

