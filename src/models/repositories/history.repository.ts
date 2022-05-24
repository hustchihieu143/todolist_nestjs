import { EntityRepository, Repository } from 'typeorm';
import { HistoryEntity } from '../entities/histories';

@EntityRepository(HistoryEntity)
export class HistoryRepository extends Repository<HistoryEntity> {
  async findHistoryById(id: number): Promise<HistoryEntity> {
    const pool = await this.createQueryBuilder('histories').select('*').where('id = :id', { id: id }).getRawOne();
    return pool;
  }
  async createHistory(data: any): Promise<void> {
    await this.createQueryBuilder().insert().into(HistoryEntity).values([data]).execute();
  }

  async getTotalStaked(poolId: number): Promise<number> {
    const totalStakedInPool = await this.createQueryBuilder('histories')
      .select('SUM(histories.amount)', 'total')
      .where('histories.type = :type ', { type: 1 })
      .andWhere('histories.poolId = :poolId', { poolId: poolId })
      .getRawOne();
    return totalStakedInPool.total;
  }

  async getTotalStakedUser(poolId: number, account: string): Promise<number> {
    const totalStakedInPool = await this.createQueryBuilder('histories')
      .select('SUM(histories.amount)', 'total')
      .where('histories.type = :type ', { type: 1 })
      .andWhere('histories.poolId = :poolId', { poolId: poolId })
      .andWhere('histories.account = :account', { account: account })
      .getRawOne();
    return totalStakedInPool.total;
  }
}
