import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { FindAllDocumentsDto } from '../dto/find-all-documents.dto';
import { Document } from '../entities/document.entity';

@Injectable()
export class FindAllDocumentsService {
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
    ) { }

    async run(findAllDocumentsDto: FindAllDocumentsDto): Promise<PaginatedResponseDto<Document>> {
        const { search, page = 1, limit = 10 } = findAllDocumentsDto;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.title = Like(`%${search.trim()}%`);
        }

        const [data, total] = await this.documentRepository.findAndCount({
            where,
            order: { title: 'ASC' },
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

