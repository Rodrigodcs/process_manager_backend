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
        return await this.processRepository.find({
            relations: ['department', 'parent'],
            order: { createdAt: 'DESC' },
        });
    }
}

