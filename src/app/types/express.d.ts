import { TokenInterface } from '../constants/token-interface.interface';

declare global {
    namespace Express {
        interface Request {
            user?: TokenInterface;
        }
    }
}

export { };

