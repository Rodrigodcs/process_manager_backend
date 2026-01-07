import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { ProcessPerson } from '../entities/process-person';
import { Process } from '../entities/process.entity';

@Injectable()
export class AddPersonToProcessService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        @InjectRepository(ProcessPerson)
        private readonly processPersonRepository: Repository<ProcessPerson>,
    ) { }

    async run(processId: string, personId: string): Promise<ProcessPerson> {
        const process = await this.processRepository.findOne({
            where: { id: processId },
        });

        if (!process) {
            throw new NotFoundException(`Process with ID ${processId} not found`);
        }

        const person = await this.personRepository.findOne({
            where: { id: personId },
        });

        if (!person) {
            throw new NotFoundException(`Person with ID ${personId} not found`);
        }

        const existingRelation = await this.processPersonRepository.findOne({
            where: { processId, personId },
        });

        if (existingRelation) {
            throw new ConflictException(
                `Person is already linked to this process`,
            );
        }

        const processPerson = this.processPersonRepository.create({
            processId,
            personId,
        });

        return await this.processPersonRepository.save(processPerson);
    }
}

