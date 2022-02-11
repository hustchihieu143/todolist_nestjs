import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log('user: ', user);
    console.log('user: ', user.email);
    if (user && user.password === pass) {
      console.log('okok');
      const { password, ...result } = user;
      console.log('result: ', result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
