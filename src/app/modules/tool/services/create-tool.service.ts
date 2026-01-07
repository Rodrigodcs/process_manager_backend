import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToolDto } from '../dto/create-tool.dto';
import { Tool } from '../entities/tool.entity';

@Injectable()
export class CreateToolService {
    constructor(
        @InjectRepository(Tool)
        private readonly toolRepository: Repository<Tool>,
    ) { }

    async run(createToolDto: CreateToolDto): Promise<Tool> {
        const normalizedName = createToolDto.name.toLowerCase().trim();

        const existingTool = await this.toolRepository.findOne({
            where: { normalizedName },
        });

        if (existingTool) {
            throw new ConflictException(
                `A tool with name "${createToolDto.name}" already exists`,
            );
        }

        const tool = this.toolRepository.create({
            ...createToolDto,
            normalizedName,
        });

        return await this.toolRepository.save(tool);
    }
}

