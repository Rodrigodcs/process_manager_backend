import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Process } from '../entities/process.entity';

@Injectable()
export class FindOneProcessService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
    ) { }

    async run(id: string): Promise<Process> {
        const process = await this.processRepository.findOne({
            where: { id },
            relations: [
                'department',
                'parent',
                'children',
                'tools',
                'tools.tool',
                'people',
                'people.person',
                'documents',
                'documents.document',
            ],
        });

        if (!process) {
            throw new NotFoundException(`Process with ID ${id} not found`);
        }

        return {
            ...process,
            childrenIds: process.children?.map(child => child.id) || [],
        } as any;
    }
}

