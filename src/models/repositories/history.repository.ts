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
      .where('histories.status = 1 OR histories.status = 2')
      .andWhere('histories.poolId = :poolId', { poolId: poolId })
      .getRawOne();
    return totalStakedInPool.total;
  }

  async getTotalStakedUser(poolId: number, account: string): Promise<number> {
    const totalStakedInPool = await this.createQueryBuilder('histories')
      .select('SUM(histories.amount)', 'total')
      .where('histories.account = :account', { account: account })
      .andWhere('histories.poolId = :poolId', { poolId: poolId })
      .andWhere('histories.status = 1 OR histories.status = 2')

      .getRawOne();
    return totalStakedInPool.total;
  }

  async getStakingPool(account?: string, poolId?: number): Promise<any> {
    const stakingPool = await this.createQueryBuilder('histories')
      .select('*')
      .where('histories.account = :account', { account: account })
      .andWhere('poolId = :poolId AND (status = 1 OR status = 2)', { poolId: poolId })
      .execute();

    return stakingPool;
  }

  async updateStatusHistory(poolId: number, status: number, stakedId: number): Promise<void> {
    await this.createQueryBuilder('histories')
      .update(HistoryEntity)
      .set({ status: status })
      .where('poolId = :poolId', { poolId: poolId })
      .andWhere('stakedId = :stakedId', { stakedId: stakedId })
      .andWhere('type = 1')
      .execute();
  }

  async getTotalValueLocked(): Promise<number> {
    const totalDeposit = await this.createQueryBuilder('histories')
      .select('SUM(amount)', 'total')
      .where('type = 1')
      .getRawOne();

    const totalWithdraw = await this.createQueryBuilder('histories')
      .select('SUM(amount)', 'total')
      .where('type = 2')
      .getRawOne();
    return Number(totalDeposit.total) - Number(totalWithdraw.total);
  }

  async getMyStakeAmount(account: string): Promise<number> {
    const totalDeposit = await this.createQueryBuilder('histories')
      .select('SUM(amount)', 'total')
      .where('type = 1 AND account = :account', { account: account })
      .getRawOne();
    return totalDeposit.total;
  }

  async getTotalWithdrawal(account: string): Promise<number> {
    const totalWithdrawal = await this.createQueryBuilder('histories')
      .select('SUM(amount)', 'total')
      .where('account = :account AND status = 2', { account: account })
      .getRawOne();
    const rs = totalWithdrawal.total !== null ? totalWithdrawal.total : 0;
    return rs;
  }
  c;
  async getTotalRewardClaimedUser(account: string): Promise<number> {
    const totalRewardClaimedUser = await this.createQueryBuilder('histories')
      .select('SUM(rewardClaimed)', 'total')
      .where('account = :account', { account: account })
      .getRawOne();
    return totalRewardClaimedUser.total;
  }
}
