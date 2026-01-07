import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from '../entities/tool.entity';

@Injectable()
export class FindOneToolService {
    constructor(
        @InjectRepository(Tool)
        private readonly toolRepository: Repository<Tool>,
    ) { }

    async run(id: string): Promise<Tool> {
        const tool = await this.toolRepository.findOne({
            where: { id },
        });

        if (!tool) {
            throw new NotFoundException(`Tool with ID ${id} not found`);
        }

        return tool;
    }
}

