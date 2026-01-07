import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entities/person.entity';

@Injectable()
export class FindOnePersonService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) { }

    async run(id: string): Promise<Person> {
        const person = await this.personRepository.findOne({
            where: { id },
        });

        if (!person) {
            throw new NotFoundException(`Person with ID ${id} not found`);
        }

        return person;
    }
}

