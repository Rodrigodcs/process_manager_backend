import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenInterface } from 'src/app/constants/token-interface.interface';
import { createPasswordHash } from 'src/app/utils/create-password-hash';
import { CheckIfUserExistsByCredentialsService } from '../../user/services/check-if-user-exists-by-credentials.service';
import { SignInDto } from '../dto/sign-in.dto';

@Injectable()
export class SignInService {
    constructor(
        private readonly checkIfUserExistsByCredentialsService: CheckIfUserExistsByCredentialsService,
        private readonly jwtService: JwtService,
    ) { }
    async run(signInDto: SignInDto): Promise<{ token: string }> {
        try {
            const { email, password } = signInDto;

            if (!email || !password) {
                throw new Error('Invalid credentials');
            }

            const passwordHashed = createPasswordHash(password);

            const validUser = await this.checkIfUserExistsByCredentialsService.run({
                email,
                password: passwordHashed,
            });

            if (!validUser) {
                throw new Error('Invalid credentials');
            }

            const tokenPayload: TokenInterface = {
                id: validUser.id,
                email: validUser.email,
            };

            const token = this.jwtService.sign(tokenPayload);

            return {
                token,
            };
        } catch (err) {
            throw new UnauthorizedException(err.message);
        }
    }
}
