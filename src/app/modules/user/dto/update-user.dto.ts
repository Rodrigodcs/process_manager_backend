import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateUserDto {
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
