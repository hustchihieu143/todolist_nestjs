import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import jwtDecode from 'jwt-decode';
// import { PayloadJwt } from 'src/shares/interfaces/jwt.interface';

export const UserID = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  try {
    const token = request.headers.authorization;
    const payload: any = jwtDecode(token);
    return payload;
  } catch (e) {
    throw new HttpException({ key: 'user.NOT_VALID_ACCESS_TOKEN' }, HttpStatus.BAD_REQUEST);
  }
});
