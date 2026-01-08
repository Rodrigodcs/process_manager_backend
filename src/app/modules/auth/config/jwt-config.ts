import { JwtModule } from '@nestjs/jwt';
import { ApiSecurityConfig } from 'src/environment';

export const JwtConfig = JwtModule.register({
    secret: ApiSecurityConfig.SECRET,
    signOptions: { expiresIn: ApiSecurityConfig.EXPIRES_IN },
});
