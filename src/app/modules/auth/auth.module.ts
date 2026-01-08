import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtConfig } from './config/jwt-config';
import { AuthController } from './controllers/auth.controller';
import { MeService } from './services/me.service';
import { SignInService } from './services/sign-in.service';
import { SignUpService } from './services/sign-up.service';

@Module({
    imports: [JwtConfig, UserModule],
    controllers: [AuthController],
    providers: [
        SignUpService,
        SignInService,
        MeService,
    ],
    exports: [JwtConfig],
})
export class AuthModule { }
