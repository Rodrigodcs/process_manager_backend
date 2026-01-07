import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDepartmentDto {
    @ApiProperty({
        description: 'Department name',
        example: 'Human Resources',
        maxLength: 255,
    })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MaxLength(255, { message: 'Name must have at most 255 characters' })
    name: string;

    @ApiProperty({
        description: 'Unique department code',
        example: 'HR',
        maxLength: 100,
        minLength: 1,
    })
    @IsString({ message: 'Code must be a string' })
    @IsNotEmpty({ message: 'Code is required' })
    @MaxLength(100, { message: 'Code must have at most 100 characters' })
    @MinLength(1, { message: 'Code must have at least 1 character' })
    code: string;

    @ApiPropertyOptional({
        description: 'Department description',
        example: 'Responsible for recruitment, training and employee management',
    })
    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({
        description: 'Department color',
        example: 'blue',
        default: 'blue',
    })
    @IsString({ message: 'Color must be a string' })
    @IsOptional()
    color?: string;

    @ApiPropertyOptional({
        description: 'Department icon name',
        example: 'FiFolder',
        default: 'FiFolder',
    })
    @IsString({ message: 'Icon must be a string' })
    @IsOptional()
    icon?: string;
}

