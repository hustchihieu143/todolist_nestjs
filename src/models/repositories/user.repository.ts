import { UserEntity } from '../entities/user.entity';
import { BaseRepository } from './base.repository';
import { EntityRepository, In } from 'typeorm';

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

  public async findBatch(from: number, count: number): Promise<UserEntity[]> {
    return this.createQueryBuilder()
      .orderBy('id', 'ASC')
      .skip(from)
      .take(count)
      .getMany();
  }

  async getAccountsByIds(ids: string[]): Promise<UserEntity[]> {
    return this.find({ where: { id: In(ids) } });
  }
}
