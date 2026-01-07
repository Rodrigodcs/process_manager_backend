import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../document/entities/document.entity';
import { ProcessDocument } from '../entities/process-document';
import { Process } from '../entities/process.entity';

@Injectable()
export class AddDocumentToProcessService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
        @InjectRepository(ProcessDocument)
        private readonly processDocumentRepository: Repository<ProcessDocument>,
    ) { }

    async run(processId: string, documentId: string): Promise<ProcessDocument> {
        const process = await this.processRepository.findOne({
            where: { id: processId },
        });

        if (!process) {
            throw new NotFoundException(`Process with ID ${processId} not found`);
        }

        const document = await this.documentRepository.findOne({
            where: { id: documentId },
        });

        if (!document) {
            throw new NotFoundException(`Document with ID ${documentId} not found`);
        }

        const existingRelation = await this.processDocumentRepository.findOne({
            where: { processId, documentId },
        });

        if (existingRelation) {
            throw new ConflictException(
                `Document is already linked to this process`,
            );
        }

        const processDocument = this.processDocumentRepository.create({
            processId,
            documentId,
        });

        return await this.processDocumentRepository.save(processDocument);
    }
}

