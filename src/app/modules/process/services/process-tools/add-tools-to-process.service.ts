import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from '../../../tool/entities/tool.entity';
import { ProcessTool } from '../../entities/process-tool';
import { Process } from '../../entities/process.entity';

@Injectable()
export class AddToolsToProcessService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Tool)
        private readonly toolRepository: Repository<Tool>,
        @InjectRepository(ProcessTool)
        private readonly processToolRepository: Repository<ProcessTool>,
    ) { }

    async run(processId: string, toolIds: string[]): Promise<{ linked: number; skipped: number }> {
        // Validate process exists
        const process = await this.processRepository.findOne({
            where: { id: processId },
        });

        if (!process) {
            throw new NotFoundException(`Process with ID ${processId} not found`);
        }

        // Validate all tools exist
        const tools = await this.toolRepository.findByIds(toolIds);
        if (tools.length !== toolIds.length) {
            throw new NotFoundException('One or more tools not found');
        }

        // Get existing links
        const existingLinks = await this.processToolRepository.find({
            where: { processId },
        });
        const existingToolIds = new Set(existingLinks.map(link => link.toolId));

        // Filter out already linked tools
        const newToolIds = toolIds.filter(id => !existingToolIds.has(id));

        // Create new links
        const newLinks = newToolIds.map(toolId =>
            this.processToolRepository.create({ processId, toolId })
        );

        if (newLinks.length > 0) {
            await this.processToolRepository.save(newLinks);
        }

        return {
            linked: newLinks.length,
            skipped: toolIds.length - newLinks.length,
        };
    }
}

