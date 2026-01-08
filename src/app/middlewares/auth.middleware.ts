import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { TokenInterface } from '../constants/token-interface.interface';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly jwt: JwtService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                throw new Error('User not authorized');
            }

            const token = authorization?.split(' ')[1];

            if (!token) {
                throw new Error('Token not found');
            }

            const decoded: TokenInterface = this.jwt.verify(token);

            if (!decoded) {
                throw new Error('Invalid token');
            }

            req.user = {
                id: decoded.id,
                email: decoded.email,
            };

            return next();
        } catch (err) {
            const statusCode = HttpStatus.UNAUTHORIZED;
            const message =
                err?.response?.message || err?.message || 'Internal server error';
            const error =
                err?.response?.error || err?.name || 'Internal server error';

            throw new HttpException(
                {
                    success: false,
                    timestamp: new Date().toISOString(),
                    message,
                    error,
                },
                statusCode,
            );
        }
    }
}
