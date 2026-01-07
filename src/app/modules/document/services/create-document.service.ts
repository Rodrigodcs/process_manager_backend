import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { Document } from '../entities/document.entity';

@Injectable()
export class CreateDocumentService {
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
    ) { }

    async run(createDocumentDto: CreateDocumentDto): Promise<Document> {
        const document = this.documentRepository.create(createDocumentDto);
        return await this.documentRepository.save(document);
    }
}

