import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { Person } from '../entities/person.entity';
import { FindOnePersonService } from './find-one-person.service';

@Injectable()
export class UpdatePersonService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        private readonly findOnePersonService: FindOnePersonService,
    ) { }

    async run(id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
        const person = await this.findOnePersonService.run(id);

        if (updatePersonDto.email && updatePersonDto.email !== person.email) {
            const existingPerson = await this.personRepository.findOne({
                where: { email: updatePersonDto.email },
            });

            if (existingPerson) {
                throw new ConflictException(
                    `A person with email "${updatePersonDto.email}" already exists`,
                );
            }
        }

        Object.assign(person, updatePersonDto);
        return await this.personRepository.save(person);
    }
}

