import { Injectable } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import { GetUserByIdService } from '../../user/services/get-user-by-id.service';

@Injectable()
export class MeService {
    constructor(
        private readonly getUserByIdService: GetUserByIdService,
    ) { }
    async run(id: string): Promise<Omit<User, 'password'>> {
        return this.getUserByIdService.run(id);
    }
}
