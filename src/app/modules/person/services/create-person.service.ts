import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from '../dto/create-person.dto';
import { Person } from '../entities/person.entity';

@Injectable()
export class CreatePersonService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) { }

    async run(createPersonDto: CreatePersonDto): Promise<Person> {
        const existingPerson = await this.personRepository.findOne({
            where: { email: createPersonDto.email },
        });

        if (existingPerson) {
            throw new ConflictException(
                `A person with email "${createPersonDto.email}" already exists`,
            );
        }

        const person = this.personRepository.create(createPersonDto);
        return await this.personRepository.save(person);
    }
}

