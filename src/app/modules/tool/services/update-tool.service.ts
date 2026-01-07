import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateToolDto } from '../dto/update-tool.dto';
import { Tool } from '../entities/tool.entity';
import { FindOneToolService } from './find-one-tool.service';

@Injectable()
export class UpdateToolService {
    constructor(
        @InjectRepository(Tool)
        private readonly toolRepository: Repository<Tool>,
        private readonly findOneToolService: FindOneToolService,
    ) { }

    async run(id: string, updateToolDto: UpdateToolDto): Promise<Tool> {
        const tool = await this.findOneToolService.run(id);

        if (updateToolDto.name) {
            const normalizedName = updateToolDto.name.toLowerCase().trim();

            if (normalizedName !== tool.normalizedName) {
                const existingTool = await this.toolRepository.findOne({
                    where: { normalizedName },
                });

                if (existingTool) {
                    throw new ConflictException(
                        `A tool with name "${updateToolDto.name}" already exists`,
                    );
                }

                tool.normalizedName = normalizedName;
            }
        }

        Object.assign(tool, updateToolDto);
        return await this.toolRepository.save(tool);
    }
}

