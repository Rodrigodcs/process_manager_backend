import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../../person/entities/person.entity';
import { ProcessPerson } from '../../entities/process-person';
import { Process } from '../../entities/process.entity';

@Injectable()
export class AddPeopleToProcessService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        @InjectRepository(ProcessPerson)
        private readonly processPersonRepository: Repository<ProcessPerson>,
    ) { }

    async run(processId: string, personIds: string[]): Promise<{ linked: number; skipped: number }> {
        const process = await this.processRepository.findOne({
            where: { id: processId },
        });

        if (!process) {
            throw new NotFoundException(`Process with ID ${processId} not found`);
        }

        const people = await this.personRepository.findByIds(personIds);
        if (people.length !== personIds.length) {
            throw new NotFoundException('One or more people not found');
        }

        const existingLinks = await this.processPersonRepository.find({
            where: { processId },
        });
        const existingPersonIds = new Set(existingLinks.map(link => link.personId));

        const newPersonIds = personIds.filter(id => !existingPersonIds.has(id));

        const newLinks = newPersonIds.map(personId =>
            this.processPersonRepository.create({ processId, personId })
        );

        if (newLinks.length > 0) {
            await this.processPersonRepository.save(newLinks);
        }

        return {
            linked: newLinks.length,
            skipped: personIds.length - newLinks.length,
        };
    }
}

