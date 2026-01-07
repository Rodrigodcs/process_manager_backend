import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePersonDto {
    @ApiProperty({
        description: 'Person name',
        example: 'John Doe',
        maxLength: 255,
    })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MaxLength(255, { message: 'Name must have at most 255 characters' })
    @Transform(({ value }) => value?.trim())
    name: string;

    @ApiPropertyOptional({
        description: 'Person role or position',
        example: 'Software Engineer',
        maxLength: 100,
    })
    @IsOptional()
    @IsString({ message: 'Role must be a string' })
    @MaxLength(100, { message: 'Role must have at most 100 characters' })
    @Transform(({ value }) => value?.trim())
    role?: string;

    @ApiProperty({
        description: 'Person email (unique)',
        example: 'john.doe@example.com',
        maxLength: 255,
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    @MaxLength(255, { message: 'Email must have at most 255 characters' })
    @Transform(({ value }) => value?.trim().toLowerCase())
    email: string;
}

