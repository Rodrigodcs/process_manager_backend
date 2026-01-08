import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { User } from '../../user/entities/user.entity';
import { CreateUserService } from '../../user/services/create-user.service';

@Injectable()
export class SignUpService {
    constructor(
        private readonly createUserService: CreateUserService,
    ) { }

    async run(signUpDto: SignUpDto): Promise<Omit<User, 'password'>> {
        return await this.createUserService.run(signUpDto);
    }
}
