import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entities/person.entity';
import { FindOnePersonService } from './find-one-person.service';

@Injectable()
export class RemovePersonService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        private readonly findOnePersonService: FindOnePersonService,
    ) { }

    async run(id: string): Promise<void> {
        const person = await this.findOnePersonService.run(id);
        await this.personRepository.remove(person);
    }
}

