import { UserEntity } from './../../models/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/repositories/user.repository';
import { CREATE_USER } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    public readonly userRepoReport: UserRepository,
    @InjectRepository(UserRepository)
    public readonly userRepoMaster: UserRepository,
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
}
