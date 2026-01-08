import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Check the health of the application' })
    @ApiOkResponse({
        description: 'Application is healthy',
        type: String,
    })
    async health() {
        const envVars = {
            PORT: process.env.PORT,
            NODE_ENV: process.env.NODE_ENV,
            TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION,
            TYPEORM_HOST: process.env.TYPEORM_HOST,
            TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
            TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
            TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
            TYPEORM_PORT: process.env.TYPEORM_PORT,
            JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
            JWT_EXPIRE: process.env.JWT_EXPIRE,
            HASH_SALT: process.env.HASH_SALT,
        };
        console.log(envVars);
        return envVars;
    }
}

