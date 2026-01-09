import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenInterface } from '../constants/token-interface.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof TokenInterface | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);

