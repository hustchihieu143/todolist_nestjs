import { UserEntity } from '../entities/user.entity';
import { BaseRepository } from './base.repository';
import { EntityRepository, In } from 'typeorm';
import { UPDATE_USER } from 'src/modules/users/user.interface';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  async getFirstAccountByAddress(address: string): Promise<UserEntity> {
    const result = await this.createQueryBuilder('accounts')
      .select('accounts.*, users.address as address')
      .innerJoin('users', 'users', 'users.id = accounts.id')
      .andWhere('users.address = :address', { address: address })
      .take(1)
      .execute();
    return result.length > 0 ? result[0] : undefined;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const result = await this.createQueryBuilder('users')
      .select('*')
      .andWhere('users.email = :email', { email: email })
      .take(1)
      .execute();
    return result.length > 0 ? result[0] : undefined;
  }

  public async findBatch(from: number, count: number): Promise<UserEntity[]> {
    return this.createQueryBuilder()
      .orderBy('id', 'ASC')
      .skip(from)
      .take(count)
      .getMany();
  }

  public async deleteUser(id: number): Promise<void> {
    this.createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('id = :id', { id: id })
      .execute();
  }

  public async updateById(id: number, body: UPDATE_USER): Promise<void> {
    console.log('body: ', body);
    const update = {};
    if (body.email) {
      console.log('okoek: ', body.email);
      update['email'] = body.email;
    }
    if (body.name) {
      update['name'] = body.name;
    }
    if (body.age) {
      update['age'] = body.age;
    }
    await this.createQueryBuilder()
      .update(UserEntity)
      .set(update)
      .where('id = :id', { id: id })
      .execute();
  }

  public async findOneById(id: number): Promise<UserEntity> {
    console.log('id: ', id);
    return await this.createQueryBuilder('users')
      .select(['users.*', 'product.name'])
      .innerJoin('users.products', 'product', `product.userId = ${id}`)
      // .addSelect('product.name')
      .where('users.id = :id', { id: id })
      .execute();
  }
}
