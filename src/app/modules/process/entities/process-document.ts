import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Document } from '../../document/entities/document.entity';
import { Process } from './process.entity';

@Entity('process_documents')
export class ProcessDocument {
  @PrimaryColumn({ name: 'process_id', type: 'uuid' })
  processId: string;

  @PrimaryColumn({ name: 'document_id', type: 'uuid' })
  documentId: string;

  @ManyToOne(() => Process, (process) => process.documents)
  @JoinColumn({ name: 'process_id' })
  process: Process;

  @ManyToOne(() => Document, (document) => document.processes)
  @JoinColumn({ name: 'document_id' })
  document: Document;
}
