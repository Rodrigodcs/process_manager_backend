import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { CurrentUser } from 'src/app/decorators/current-user.decorator';
import { User } from '../../user/entities/user.entity';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { MeService } from '../services/me.service';
import { SignInService } from '../services/sign-in.service';
import { SignUpService } from '../services/sign-up.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly signUpService: SignUpService,
        private readonly signInService: SignInService,
        private readonly meService: MeService,
    ) { }

    @Post('sign-up')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new user' })
    @ApiCreatedResponse({
        description: 'User created successfully',
        type: User,
    })
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.signUpService.run(signUpDto);
    }

    @Post('sign-in')
    @ApiOperation({ summary: 'Login a user' })
    @ApiParam({ name: 'id', description: 'User ID (UUID)' })
    @ApiOkResponse({
        description: 'User found',
        type: User,
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    async signIn(@Body() signInDto: SignInDto) {
        return await this.signInService.run(signInDto);
    }

    @Get('me')
    @ApiOperation({ summary: 'Get the current user' })
    @ApiOkResponse({
        description: 'User found',
        type: User,
    })
    async me(@CurrentUser('id') id: string) {
        return this.meService.run(id);
    }
}

