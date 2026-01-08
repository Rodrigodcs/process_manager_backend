import { Module } from '@nestjs/common';
import { JwtConfig } from './config/jwt-config';
import { AuthController } from './controllers/auth.controller';
import { SignInService } from './services/sign-in.service';
import { SignUpService } from './services/sign-up.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [JwtConfig, UserModule],
    controllers: [AuthController],
    providers: [
        SignUpService,
        SignInService,
    ],
    exports: [JwtConfig],
})
export class AuthModule { }

