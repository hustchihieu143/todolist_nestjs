import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserEntity } from '../../models/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../auth/local-auth.guard';
// import { CREATE_USER } from './user.interface';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('/create')
  // @ApiBody({
  //   type: String,
  //   schema: {
  //     example: '{ "email": "thien.nguyen3@sotatek.com" }',
  //   },
  // })
  // async createUser(@Body() createUser: CREATE_USER): Promise<any> {
  //   const user = await this.usersService.createUser(createUser);
  //   return { data: user };
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
