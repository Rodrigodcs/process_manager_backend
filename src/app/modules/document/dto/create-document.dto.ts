import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateDocumentDto {
    @ApiProperty({
        description: 'Document title',
        example: 'Employee Handbook 2024',
        maxLength: 255,
    })
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    @MaxLength(255, { message: 'Title must have at most 255 characters' })
    @Transform(({ value }) => value?.trim())
    title: string;

    @ApiPropertyOptional({
        description: 'Document description',
        example: 'Complete guide for new employees',
    })
    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    @Transform(({ value }) => value?.trim())
    description?: string;

    @ApiPropertyOptional({
        description: 'Document URL',
        example: 'https://docs.example.com/handbook.pdf',
        maxLength: 500,
    })
    @IsOptional()
    @IsUrl({}, { message: 'URL must be a valid URL' })
    @MaxLength(500, { message: 'URL must have at most 500 characters' })
    @Transform(({ value }) => value?.trim())
    url?: string;
}

