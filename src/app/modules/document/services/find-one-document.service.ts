import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entities/document.entity';

@Injectable()
export class FindOneDocumentService {
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
    ) { }

    async run(id: string): Promise<Document> {
        const document = await this.documentRepository.findOne({
            where: { id },
        });

        if (!document) {
            throw new NotFoundException(`Document with ID ${id} not found`);
        }

        return document;
    }
}

