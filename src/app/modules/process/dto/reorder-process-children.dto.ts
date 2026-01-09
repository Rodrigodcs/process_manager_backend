import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsUUID } from "class-validator";

export class ReorderProcessChildrenDto {
    @ApiProperty({
        description: 'Array of process IDs to reorder',
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
        type: [String],
    })
    @IsArray({ message: 'processIds must be an array' })
    @ArrayNotEmpty({ message: 'processIds array cannot be empty' })
    @IsUUID('4', { each: true, message: 'Each processId must be a valid UUID' })
    processIds: string[];
}