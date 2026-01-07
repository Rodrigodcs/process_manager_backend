import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tool } from '../entities/tool.entity';
import { FindOneToolService } from './find-one-tool.service';

@Injectable()
export class RemoveToolService {
    constructor(
        @InjectRepository(Tool)
        private readonly toolRepository: Repository<Tool>,
        private readonly findOneToolService: FindOneToolService,
    ) { }

    async run(id: string): Promise<void> {
        const tool = await this.findOneToolService.run(id);
        await this.toolRepository.remove(tool);
    }
}

