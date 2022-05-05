import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('inside RolesGuard');
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const roles = ['admin', 'user'];
    console.log(roles);
    // if (!roles) {
    //   return true;
    // }
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    //return matchRoles(roles, user.roles);
    console.log('user roles: ', user);
    if (roles.includes('admin')) {
      return true;
    }
    return false;
  }
}
