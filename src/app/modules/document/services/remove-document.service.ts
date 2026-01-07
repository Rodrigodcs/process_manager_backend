import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entities/document.entity';
import { FindOneDocumentService } from './find-one-document.service';

@Injectable()
export class RemoveDocumentService {
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
        private readonly findOneDocumentService: FindOneDocumentService,
    ) { }

    async run(id: string): Promise<void> {
        const document = await this.findOneDocumentService.run(id);
        await this.documentRepository.remove(document);
    }
}

