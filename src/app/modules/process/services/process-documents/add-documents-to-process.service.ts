import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../../document/entities/document.entity';
import { ProcessDocument } from '../../entities/process-document';
import { Process } from '../../entities/process.entity';

@Injectable()
export class AddDocumentsToProcessService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
        @InjectRepository(ProcessDocument)
        private readonly processDocumentRepository: Repository<ProcessDocument>,
    ) { }

    async run(processId: string, documentIds: string[]): Promise<{ linked: number; skipped: number }> {
        const process = await this.processRepository.findOne({
            where: { id: processId },
        });

        if (!process) {
            throw new NotFoundException(`Process with ID ${processId} not found`);
        }

        const documents = await this.documentRepository.findByIds(documentIds);
        if (documents.length !== documentIds.length) {
            throw new NotFoundException('One or more documents not found');
        }

        const existingLinks = await this.processDocumentRepository.find({
            where: { processId },
        });
        const existingDocumentIds = new Set(existingLinks.map(link => link.documentId));

        const newDocumentIds = documentIds.filter(id => !existingDocumentIds.has(id));

        const newLinks = newDocumentIds.map(documentId =>
            this.processDocumentRepository.create({ processId, documentId })
        );

        if (newLinks.length > 0) {
            await this.processDocumentRepository.save(newLinks);
        }

        return {
            linked: newLinks.length,
            skipped: documentIds.length - newLinks.length,
        };
    }
}

