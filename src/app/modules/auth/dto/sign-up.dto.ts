import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
    @ApiProperty({
        description: 'User name',
        example: 'John Doe',
        maxLength: 255,
    })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MaxLength(255, { message: 'Name must have at most 255 characters' })
    @Transform(({ value }) => value?.trim())
    name: string;

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

    @ApiProperty({
        description: 'User password (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char)',
        example: 'MyP@ssw0rd',
        minLength: 8,
        maxLength: 255,
    })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(255, { message: 'Password must have at most 255 characters' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
            message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character (@$!%*?&)',
        }
    )
    password: string;

    @ApiPropertyOptional({
        description: 'User avatar/profile color (for frontend display)',
        example: 'blue',
        default: 'blue',
    })
    @IsString({ message: 'Color must be a string' })
    @IsOptional()
    color?: string;

    @ApiPropertyOptional({
        description: 'User avatar/profile icon name (for frontend display)',
        example: 'FiUser',
        default: 'FiUser',
    })
    @IsString({ message: 'Icon must be a string' })
    @IsOptional()
    icon?: string;
}

