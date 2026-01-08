import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../../person/entities/person.entity';
import { Process } from '../../entities/process.entity';

@Injectable()
export class ListProcessPeopleService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) { }

    async run(processId: string): Promise<Person[]> {
        const process = await this.processRepository.findOne({
            where: { id: processId },
        });

        if (!process) {
            throw new NotFoundException(`Process with ID ${processId} not found`);
        }

        const people = await this.personRepository
            .createQueryBuilder('person')
            .innerJoin('process_people', 'pp', 'pp.person_id = person.id')
            .where('pp.process_id = :processId', { processId })
            .orderBy('person.name', 'ASC')
            .getMany();

        return people;
    }
}

