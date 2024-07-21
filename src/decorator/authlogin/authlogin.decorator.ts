import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Authlogin = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const headers = req.headers;
        console.log('AuthLogin decorator',headers['authorization'], data);
        return headers['authorization'] ? headers['authorization'] : data;
    }
)