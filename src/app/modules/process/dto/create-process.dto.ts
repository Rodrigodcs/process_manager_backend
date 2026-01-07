import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
} from 'class-validator';
import { ProcessStatus, ProcessType } from '../entities/process.entity';

export class CreateProcessDto {
    @ApiProperty({
        description: 'Process name',
        example: 'Recruitment and Selection',
        maxLength: 255,
    })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MaxLength(255, { message: 'Name must have at most 255 characters' })
    name: string;

    @ApiPropertyOptional({
        description: 'Detailed process description',
        example: 'Process for hiring new employees',
    })
    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Process type',
        enum: ProcessType,
        example: ProcessType.MANUAL,
    })
    @IsEnum(ProcessType, {
        message: 'Type must be MANUAL or SYSTEMIC',
    })
    @IsNotEmpty({ message: 'Type is required' })
    type: ProcessType;

    @ApiProperty({
        description: 'Process status',
        enum: ProcessStatus,
        example: ProcessStatus.ACTIVE,
    })
    @IsEnum(ProcessStatus, {
        message: 'Status must be ACTIVE, IN_REVIEW or DEPRECATED',
    })
    @IsNotEmpty({ message: 'Status is required' })
    status: ProcessStatus;

    @ApiProperty({
        description: 'ID of the department to which the process belongs',
        example: '123e4567-e89b-12d3-a456-426614174000',
        format: 'uuid',
    })
    @IsUUID('4', { message: 'Department ID must be a valid UUID' })
    @IsNotEmpty({ message: 'Department ID is required' })
    departmentId: string;

    @ApiPropertyOptional({
        description: 'Parent process ID (for hierarchical processes)',
        example: '123e4567-e89b-12d3-a456-426614174000',
        format: 'uuid',
    })
    @IsUUID('4', { message: 'Parent process ID must be a valid UUID' })
    @IsOptional()
    parentId?: string;
}

