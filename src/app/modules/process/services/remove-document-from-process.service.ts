import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessDocument } from '../entities/process-document';

@Injectable()
export class RemoveDocumentFromProcessService {
    constructor(
        @InjectRepository(ProcessDocument)
        private readonly processDocumentRepository: Repository<ProcessDocument>,
    ) { }

    async run(processId: string, documentId: string): Promise<void> {
        const processDocument = await this.processDocumentRepository.findOne({
            where: { processId, documentId },
        });

        if (!processDocument) {
            throw new NotFoundException(
                `Document is not linked to this process`,
            );
        }

        await this.processDocumentRepository.remove(processDocument);
    }
}

