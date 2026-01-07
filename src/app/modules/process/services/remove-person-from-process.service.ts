import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessPerson } from '../entities/process-person';

@Injectable()
export class RemovePersonFromProcessService {
    constructor(
        @InjectRepository(ProcessPerson)
        private readonly processPersonRepository: Repository<ProcessPerson>,
    ) { }

    async run(processId: string, personId: string): Promise<void> {
        const processPerson = await this.processPersonRepository.findOne({
            where: { processId, personId },
        });

        if (!processPerson) {
            throw new NotFoundException(
                `Person is not linked to this process`,
            );
        }

        await this.processPersonRepository.remove(processPerson);
    }
}

