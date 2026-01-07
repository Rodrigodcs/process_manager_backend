import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from './controllers/document.controller';
import { Document } from './entities/document.entity';
import { CreateDocumentService } from './services/create-document.service';
import { FindAllDocumentsService } from './services/find-all-documents.service';
import { FindOneDocumentService } from './services/find-one-document.service';
import { RemoveDocumentService } from './services/remove-document.service';
import { UpdateDocumentService } from './services/update-document.service';

@Module({
    imports: [TypeOrmModule.forFeature([Document])],
    controllers: [DocumentController],
    providers: [
        CreateDocumentService,
        FindAllDocumentsService,
        FindOneDocumentService,
        UpdateDocumentService,
        RemoveDocumentService,
    ],
    exports: [
        CreateDocumentService,
        FindAllDocumentsService,
        FindOneDocumentService,
        UpdateDocumentService,
        RemoveDocumentService,
    ],
})
export class DocumentModule { }

