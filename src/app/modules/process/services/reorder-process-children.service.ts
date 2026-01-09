import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Process } from '../entities/process.entity';

@Injectable()
export class ReorderProcessChildrenService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
    ) { }

    async run(parentId: string, processIds: string[]): Promise<void> {
        const updates = processIds.map((id, index) =>
            this.processRepository.update(id, { order: index })
        );
        await Promise.all(updates);
    }
}

