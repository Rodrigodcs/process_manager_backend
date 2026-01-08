import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { CheckIfUserExistsByCredentialsService } from './services/check-if-user-exists-by-credentials.service';
import { CreateUserService } from './services/create-user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        CreateUserService,
        CheckIfUserExistsByCredentialsService,
    ],
    exports: [
        CreateUserService,
        CheckIfUserExistsByCredentialsService,
    ],
})
export class UserModule { }

