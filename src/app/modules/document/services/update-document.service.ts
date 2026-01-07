import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { Document } from '../entities/document.entity';
import { FindOneDocumentService } from './find-one-document.service';

@Injectable()
export class UpdateDocumentService {
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
        private readonly findOneDocumentService: FindOneDocumentService,
    ) { }

    async run(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Document> {
        const document = await this.findOneDocumentService.run(id);
        Object.assign(document, updateDocumentDto);
        return await this.documentRepository.save(document);
    }
}

