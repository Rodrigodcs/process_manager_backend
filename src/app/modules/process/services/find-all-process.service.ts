import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Process } from '../entities/process.entity';

@Injectable()
export class FindAllProcessService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
    ) { }

    async run(): Promise<Process[]> {
        const processes = await this.processRepository.find({
            relations: ['department', 'parent', 'children'],
            order: { createdAt: 'DESC' },
        });

        // Map processes to include childrenIds array
        return processes.map(process => ({
            ...process,
            childrenIds: process.children?.map(child => child.id) || [],
        })) as any;
    }
}

