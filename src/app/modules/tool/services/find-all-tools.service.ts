import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { FindAllToolsDto } from '../dto/find-all-tools.dto';
import { Tool } from '../entities/tool.entity';

@Injectable()
export class FindAllToolsService {
    constructor(
        @InjectRepository(Tool)
        private readonly toolRepository: Repository<Tool>,
    ) { }

    async run(findAllToolsDto: FindAllToolsDto): Promise<PaginatedResponseDto<Tool>> {
        const { search, page = 1, limit = 10 } = findAllToolsDto;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.normalizedName = Like(`%${search.toLowerCase().trim()}%`);
        }

        const [data, total] = await this.toolRepository.findAndCount({
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

