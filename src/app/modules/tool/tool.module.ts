import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolController } from './controllers/tool.controller';
import { Tool } from './entities/tool.entity';
import { CreateToolService } from './services/create-tool.service';
import { FindAllToolsService } from './services/find-all-tools.service';
import { FindOneToolService } from './services/find-one-tool.service';
import { RemoveToolService } from './services/remove-tool.service';
import { UpdateToolService } from './services/update-tool.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tool])],
    controllers: [ToolController],
    providers: [
        CreateToolService,
        FindAllToolsService,
        FindOneToolService,
        UpdateToolService,
        RemoveToolService,
    ],
    exports: [],
})
export class ToolModule { }

