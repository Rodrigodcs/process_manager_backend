import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenInterface } from '../constants/token-interface.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof TokenInterface | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // Se passar uma propriedade específica, retorna só ela
    // Ex: @CurrentUser('id') retorna apenas o id
    return data ? user?.[data] : user;
  },
);

