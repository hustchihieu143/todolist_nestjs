import { LocalAuthGuard } from './local-auth.guard';
import { CREATE_USER, LOGIN_USER } from '../users/user.interface';

import { UsersService } from './../users/users.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}
  @Post('/register')
  @ApiBody({
    type: String,
    schema: {
      example: '{ "email": "thien.nguyen3@sotatek.com" }',
    },
  })
  async createUser(@Body() createUser: CreateUserDto): Promise<any> {
    return await this.usersService.createUser(createUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({
    type: String,
    schema: {
      example: '{ "email": "duong@gmail.com", "password": "123" }',
    },
  })
  async login(@Body() user: LOGIN_USER, @Req() req: Request): Promise<any> {
    console.log('req: ', req.user);
    return await this.authService.login(user);
  }
}
