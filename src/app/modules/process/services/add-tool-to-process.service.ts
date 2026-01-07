import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from '../../tool/entities/tool.entity';
import { ProcessTool } from '../entities/process-tool';
import { Process } from '../entities/process.entity';

@Injectable()
export class AddToolToProcessService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Tool)
        private readonly toolRepository: Repository<Tool>,
        @InjectRepository(ProcessTool)
        private readonly processToolRepository: Repository<ProcessTool>,
    ) { }

    async run(processId: string, toolId: string): Promise<ProcessTool> {
        const process = await this.processRepository.findOne({
            where: { id: processId },
        });

        if (!process) {
            throw new NotFoundException(`Process with ID ${processId} not found`);
        }

        const tool = await this.toolRepository.findOne({
            where: { id: toolId },
        });

        if (!tool) {
            throw new NotFoundException(`Tool with ID ${toolId} not found`);
        }

        const existingRelation = await this.processToolRepository.findOne({
            where: { processId, toolId },
        });

        if (existingRelation) {
            throw new ConflictException(
                `Tool is already linked to this process`,
            );
        }

        const processTool = this.processToolRepository.create({
            processId,
            toolId,
        });

        return await this.processToolRepository.save(processTool);
    }
}

