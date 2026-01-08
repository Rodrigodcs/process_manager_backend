import * as crypto from 'crypto';
import { ApiSecurityConfig } from '../../environment';

export function createPasswordHash(password: any): string {
    const hardCodeSalt = ApiSecurityConfig.HASH_SALT;

    const hash = crypto.createHash('sha256');
    hash.update(password + hardCodeSalt);
    return hash.digest('hex');
}
