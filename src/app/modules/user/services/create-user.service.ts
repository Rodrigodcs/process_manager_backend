import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createPasswordHash } from 'src/app/utils/create-password-hash';
import { Repository } from 'typeorm';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async run(signUpDto: SignUpDto): Promise<Omit<User, 'password'>> {
        const existingUser = await this.userRepository.findOne({
            where: { email: signUpDto.email },
        });

        if (existingUser) {
            throw new ConflictException(
                `A user with email ${signUpDto.email} already exists`,
            );
        }

        const hashedPassword = createPasswordHash(signUpDto.password);

        const user = this.userRepository.create({
            ...signUpDto,
            password: hashedPassword,
        });

        const savedUser = await this.userRepository.save(user);

        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }
}

