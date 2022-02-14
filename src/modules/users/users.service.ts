import { UserEntity } from './../../models/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/repositories/user.repository';
import { CREATE_USER, UPDATE_USER } from './user.interface';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    public readonly userRepoReport: UserRepository,
    @InjectRepository(UserRepository)
    public readonly userRepoMaster: UserRepository, // private readonly redisService: RedisService,
  ) {}

  async findOne(email: string): Promise<UserEntity> {
    const user = await this.userRepoMaster.findOneByEmail(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async createUser(body: CREATE_USER): Promise<any> {
    const _user = new UserEntity();
    _user.email = body.email;
    _user.password = body.password;
    _user.name = body.name;
    _user.age = body.age;
    const saveUser = await this.userRepoReport.save(_user);
    return { data: saveUser };
  }

  async deleteUser(id: number): Promise<any> {
    return await this.userRepoReport.deleteUser(id);
  }

  async updateUser(id: number, body: UPDATE_USER): Promise<any> {
    return await this.userRepoReport.updateById(id, body);
  }

  async getProfile(id: number): Promise<UserEntity> {
    return await this.userRepoMaster.findOneById(id);
  }

  async testRedis(): Promise<void> {
    // await this.redisService.getClient().set(`test`, 'phan chi hieu', 'ex', 60);
    // const test = JSON.parse(await this.redisService.getClient().get('test'));
    // console.log('test: ', test);
  }
}
