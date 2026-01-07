import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateToolDto {
    @ApiProperty({
        description: 'Tool name',
        example: 'Jira Software',
        maxLength: 255,
    })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MaxLength(255, { message: 'Name must have at most 255 characters' })
    @Transform(({ value }) => value?.trim())
    name: string;

    @ApiPropertyOptional({
        description: 'Tool description',
        example: 'Project management and issue tracking tool',
    })
    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    @Transform(({ value }) => value?.trim())
    description?: string;

    @ApiPropertyOptional({
        description: 'Tool URL',
        example: 'https://www.atlassian.com/software/jira',
        maxLength: 500,
    })
    @IsOptional()
    @IsUrl({}, { message: 'URL must be a valid URL' })
    @MaxLength(500, { message: 'URL must have at most 500 characters' })
    @Transform(({ value }) => value?.trim())
    url?: string;
}

