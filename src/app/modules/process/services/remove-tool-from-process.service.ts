import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessTool } from '../entities/process-tool';

@Injectable()
export class RemoveToolFromProcessService {
    constructor(
        @InjectRepository(ProcessTool)
        private readonly processToolRepository: Repository<ProcessTool>,
    ) { }

    async run(processId: string, toolId: string): Promise<void> {
        const processTool = await this.processToolRepository.findOne({
            where: { processId, toolId },
        });

        if (!processTool) {
            throw new NotFoundException(
                `Tool is not linked to this process`,
            );
        }

        await this.processToolRepository.remove(processTool);
    }
}

