import { Injectable } from '@nestjs/common';
import { HistoryRepository } from 'src/models/repositories/history.repository';
@Injectable()
export class HistoryService {
  constructor(private historyRepo: HistoryRepository) {}
  async getStakingPool(account: string, poolId: number) {
    return this.historyRepo.getStakingPool(account, poolId);
  }

  async getTotalValueLocked() {
    return this.historyRepo.getTotalValueLocked();
  }

  async getMyStakeAmount(account: string) {
    return this.historyRepo.getMyStakeAmount(account);
  }
}
