import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID, ArrayNotEmpty } from 'class-validator';

export class LinkPeopleDto {
    @ApiProperty({
        description: 'Array of Person IDs to link to the process',
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
        type: [String],
    })
    @IsArray({ message: 'personIds must be an array' })
    @ArrayNotEmpty({ message: 'personIds array cannot be empty' })
    @IsUUID('4', { each: true, message: 'Each personId must be a valid UUID' })
    personIds: string[];
}

export class LinkToolsDto {
    @ApiProperty({
        description: 'Array of Tool IDs to link to the process',
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
        type: [String],
    })
    @IsArray({ message: 'toolIds must be an array' })
    @ArrayNotEmpty({ message: 'toolIds array cannot be empty' })
    @IsUUID('4', { each: true, message: 'Each toolId must be a valid UUID' })
    toolIds: string[];
}

export class LinkDocumentsDto {
    @ApiProperty({
        description: 'Array of Document IDs to link to the process',
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
        type: [String],
    })
    @IsArray({ message: 'documentIds must be an array' })
    @ArrayNotEmpty({ message: 'documentIds array cannot be empty' })
    @IsUUID('4', { each: true, message: 'Each documentId must be a valid UUID' })
    documentIds: string[];
}

