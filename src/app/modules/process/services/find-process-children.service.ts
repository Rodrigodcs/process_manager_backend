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
        // First, verify the parent process exists
        const parentProcess = await this.processRepository.findOne({
            where: { id: parentId },
        });

        if (!parentProcess) {
            throw new NotFoundException(`Process with ID ${parentId} not found`);
        }

        // Find all direct children
        const children = await this.processRepository.find({
            where: { parentId },
            relations: ['children'], // Include info if children have their own children
            order: { name: 'ASC' },
        });

        // Map processes to include childrenIds array
        return children.map(child => ({
            ...child,
            childrenIds: child.children?.map(c => c.id) || [],
        })) as any;
    }
}

