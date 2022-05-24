import { PoolRepository } from 'src/models/repositories/pool.repository';
import { PoolEntity } from 'src/models/entities/pools.entity';
import { Injectable, Query } from '@nestjs/common';
import { HistoryRepository } from 'src/models/repositories/history.repository';

@Injectable()
export class PoolService {
  constructor(private poolRepo: PoolRepository, private historyRepo: HistoryRepository) {}

  async getAllPool(account: string): Promise<PoolEntity[]> {
    const pools = await this.poolRepo.getAllPool();
    for (let i = 0; i < pools.length; i++) {
      pools[i]['totalStaked'] = await this.getTotalStaked(pools[i].id);
      if (account) {
        pools[i]['staked'] = await this.getTotalStakedUser(pools[i].id, account);
      } else {
        pools[i]['staked'] = 0;
      }
    }
    return pools;
  }

  // get total staked of all user in a pool
  async getTotalStaked(poolId: number): Promise<number> {
    return await this.historyRepo.getTotalStaked(poolId);
  }

  // get total staked of current user in a pool
  async getTotalStakedUser(poolId: number, account: string): Promise<number> {
    return await this.historyRepo.getTotalStakedUser(poolId, account);
  }
}
