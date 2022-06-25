import { HistoryService } from './history.service';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Query, Param } from '@nestjs/common';
import { HistoryDto } from './dtos/history.dto';

@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get('/staking-pool')
  async getStakingPool(@Query() data: HistoryDto) {
    const rs = await this.historyService.getStakingPool(data.account, data.poolId);
    return { data: rs };
  }

  @Get('/total-value-locked')
  async getTotalValueLocked() {
    const rs = await this.historyService.getTotalValueLocked();
    return { data: rs };
  }

  @Get('/my-staked-amount/:account')
  async getMyStakeAmount(@Param('account') account: string) {
    const rs = await this.historyService.getMyStakeAmount(account);
    return { data: rs };
  }

  @Get('/total-withdrawal/:account')
  async getTotalWithdrawal(@Param('account') account: string) {
    const rs = await this.historyService.getTotalWithdrawal(account);
    return { data: rs };
  }

  @Get('/total-reward-claimed/:account')
  async getTotalRewardClaimedUser(@Param('account') account: string) {
    const rs = await this.historyService.getTotalRewardClaimedUser(account);
    return { data: rs };
  }
}
