import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Process } from '../entities/process.entity';
import { FindOneProcessService } from './find-one-process.service';

@Injectable()
export class RemoveProcessService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        private readonly findOneProcessService: FindOneProcessService,
    ) { }

    async run(id: string): Promise<void> {
        const process = await this.findOneProcessService.run(id);
        await this.processRepository.remove(process);
    }
}

