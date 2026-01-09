import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Process } from '../entities/process.entity';

@Injectable()
export class FindProcessChildrenService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
    ) { }

    async run(parentId: string): Promise<Process[]> {
        const parentProcess = await this.processRepository.findOne({
            where: { id: parentId },
        });

        if (!parentProcess) {
            throw new NotFoundException(`Process with ID ${parentId} not found`);
        }

        const children = await this.processRepository.find({
            where: { parentId },
            relations: ['children'],
            order: { order: 'ASC' },
        });

        return children.map(child => ({
            ...child,
            childrenIds: child.children?.map(c => c.id) || [],
        })) as any;
    }
}

