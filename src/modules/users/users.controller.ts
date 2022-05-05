import { Body, Controller, Get, Post, Req, Request, Param, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserEntity } from '../../models/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UPDATE_USER } from './user.interface';
import { UserID } from '../auth/get-user-id.decorator';
import { RolesGuard } from '../auth/roles.guard';
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

  @Post('/delete:id')
  async deleteUser(@Param('id') id: number): Promise<any> {
    try {
      await this.usersService.deleteUser(id);
      return {
        status: 'success',
      };
    } catch (err) {
      throw new HttpException('server error', 500);
    }
  }

  @Post('/update:id')
  @ApiBody({
    type: String,
    schema: {
      example: '{ "name": "hieu" }',
    },
  })
  async updateUser(@Param('id') id: number, @Body() body: UPDATE_USER): Promise<any> {
    try {
      this.usersService.updateUser(id, body);
      return { status: 'success' };
    } catch (err) {
      throw new HttpException('server error', 500);
    }
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getProfile(@UserID() payload: any) {
    console.log('payload userid: ', payload);
    // const user = await this.usersService.getProfile(id);
    // if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // return user;
  }

  // @Get('/test-redis')
  // async testRedis(): Promise<void> {
  //   // await this.usersService.testRedis();
  // }
}
