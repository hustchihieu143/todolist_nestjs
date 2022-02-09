import { LocalAuthGuard } from './local-auth.guard';
import { LOGIN_USER } from './../users/users.interface';
import { CREATE_USER } from './../../../dist/modules/users/user.interface.d';
import { UsersService } from './../users/users.service';
import { ApiBody } from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @Post('/register')
  @ApiBody({
    type: String,
    schema: {
      example: '{ "email": "thien.nguyen3@sotatek.com" }',
    },
  })
  async createUser(@Body() createUser: CREATE_USER): Promise<any> {
    return await this.usersService.createUser(createUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({
    type: String,
    schema: {
      example: '{ "email": "thien.nguyen3@sotatek.com", "password": "123" }',
    },
  })
  async login(@Body() user: LOGIN_USER): Promise<any> {
    return await this.authService.login(user);
  }
}
