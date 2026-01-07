import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { FindAllPeopleDto } from '../dto/find-all-people.dto';
import { Person } from '../entities/person.entity';

@Injectable()
export class FindAllPeopleService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) { }

    async run(findAllPeopleDto: FindAllPeopleDto): Promise<PaginatedResponseDto<Person>> {
        const { search, page = 1, limit = 10 } = findAllPeopleDto;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.name = Like(`%${search.trim()}%`);
        }

        const [data, total] = await this.personRepository.findAndCount({
            where,
            order: { name: 'ASC' },
            skip,
            take: limit,
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages,
                hasPreviousPage: page > 1,
                hasNextPage: page < totalPages,
            },
        };
    }
}

