import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../../document/entities/document.entity';
import { Process } from '../../entities/process.entity';

@Injectable()
export class ListProcessDocumentsService {
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
    ) { }

    async run(processId: string): Promise<Document[]> {
        const process = await this.processRepository.findOne({
            where: { id: processId },
        });

        if (!process) {
            throw new NotFoundException(`Process with ID ${processId} not found`);
        }

        const documents = await this.documentRepository
            .createQueryBuilder('document')
            .innerJoin('process_documents', 'pd', 'pd.document_id = document.id')
            .where('pd.process_id = :processId', { processId })
            .orderBy('document.title', 'ASC')
            .getMany();

        return documents;
    }
}

