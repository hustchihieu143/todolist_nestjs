import { stakingPoolContract, maxRange } from './config/crawler.config';
import { Injectable } from '@nestjs/common';
import { CrawlUtils } from './utils/crawler-utils';
import { CrawlStatusRepository } from '../../models/repositories/crawler.repository';
import { ContractDto, GetBlockDto } from './dto/contract.dto';
import { LogEventDto } from './dto/log-event-crawler.dto';
import { EventContract } from 'src/constants/crawler';
import { EventListenerTypes } from 'typeorm/metadata/types/EventListenerTypes';
import { PoolRepository } from 'src/models/repositories/pool.repository';
import BigNumber from 'bignumber.js';
import { PoolEntity } from 'src/models/entities/pools.entity';
import { HistoryEntity } from 'src/models/entities/histories';
import { HistoryRepository } from 'src/models/repositories/history.repository';

@Injectable()
export class CrawlEvent {
  constructor(
    private crawlStatusRepository: CrawlStatusRepository,
    private poolRepository: PoolRepository,
    private historyRepository: HistoryRepository,
  ) {}

  async start(): Promise<void> {
    try {
      // CRAWLER DIGGER
      await this.rootControllerCrawl(stakingPoolContract);
    } catch (error) {
      console.log(error);
    }
  }

  async rootControllerCrawl(contract: ContractDto): Promise<void> {
    const crawlUtils = new CrawlUtils(this.crawlStatusRepository);
    while (true) {
      const { lateBlockSC, getBlockDB } = await this.getBlockSCAndBlockDB(crawlUtils, contract);
      console.log('lateBlockSC, getBlockDB: ', lateBlockSC, getBlockDB);
      const checkBlock: boolean = this.checkBlockValid(lateBlockSC, getBlockDB);
      if (checkBlock === false) {
        continue;
      }
      await this.crawlerController(crawlUtils, getBlockDB, lateBlockSC, contract);
    }
  }

  async getBlockSCAndBlockDB(crawlUtils: CrawlUtils, Contract: ContractDto): Promise<GetBlockDto> {
    const [lateBlockSC, getBlockDB] = await Promise.all([
      crawlUtils.getLateBlock(Contract),
      crawlUtils.getBlockNumber(Contract),
    ]);
    return { lateBlockSC, getBlockDB };
  }

  checkBlockValid(lateBlockSC: number, getBlockDB: number): boolean {
    if (getBlockDB >= lateBlockSC) {
      console.log('please check default block in .env it should not be too big than lateBlock ......😆😆');
      return false;
    } else {
      return true;
    }
  }

  async crawlerController(
    crawlUtils: CrawlUtils,
    getBlockDB: number,
    lateBlockSC: number,
    contract: ContractDto,
  ): Promise<void> {
    const fromBlock: number = getBlockDB;

    const toBlock: number = this.getToBlock(lateBlockSC, getBlockDB);

    console.log('-------------fromBlock: ', fromBlock);
    console.log('--------------toBlock: ', toBlock);

    await this.updateBlockCrawlSuccess(toBlock, contract.contractName);

    const events = await crawlUtils.crawlEvent(fromBlock, toBlock, contract);

    await this.handlerEvent(contract, events); // filter handler event of contract
  }

  async handlerEvent(contract: ContractDto, events: LogEventDto[]): Promise<void> {
    events.forEach(async (event) => {
      switch (event.event) {
        case EventContract.PoolCreate: {
          await this.saveDataPoolCreated(event);
          break;
        }
        case EventContract.Deposit: {
          await this.saveDataHistory(event);
          break;
        }
        case EventContract.WithDraw: {
          break;
        }
        case EventContract.ClaimReward: {
        }
      }
    });
  }

  async saveDataPoolCreated(event: any): Promise<void> {
    const pool = await this.poolRepository.findPoolById(event.returnValues.poolId);
    if (pool) {
      console.log('Pool is already created');
      return;
    }

    const poolData = new PoolEntity();
    poolData.id = event.returnValues.poolId;
    poolData.acceptedToken = event.returnValues.acceptedToken;
    poolData.cap = Number(new BigNumber(event.returnValues.cap).div(Math.pow(10, 18)));
    poolData.lockDuration = event.returnValues.lockDuration;
    poolData.delayDuration = event.returnValues.delayDuration;
    poolData.APR = Number(new BigNumber(event.returnValues.APR).div(Math.pow(10, 18)));

    await this.poolRepository.save(poolData);
    // await this.poolRepository.createPool(poolData);
  }
  async saveDataHistory(event: any): Promise<void> {
    if (event.returnValues.poolId < 2) return;
    const historyData = new HistoryEntity();

    switch (event.event) {
      case 'StakingPoolDeposit': {
        historyData.type = 1;
        break;
      }
      case 'StakingPoolWithdraw': {
        historyData.type = 2;
        break;
      }
      case 'StakingPoolClaimReward': {
        historyData.type = 3;
        break;
      }
    }

    historyData.poolId = event.returnValues.poolId;
    historyData.account = event.returnValues.account;
    historyData.amount = Number(new BigNumber(event.returnValues.amount).div(Math.pow(10, 18)));
    historyData.stakedId = event.returnValues.stakedId;

    await this.historyRepository.save(historyData);
  }

  async updateBlockCrawlSuccess(toBlock: number, contractName: string): Promise<void> {
    const blockNumber = Number(toBlock);
    await this.crawlStatusRepository.update({ contractName }, { blockNumber });
    console.log('update block success block--' + toBlock);
  }

  getToBlock(lateBlockSC: number, getBlockDB: number): number {
    if (lateBlockSC - getBlockDB < maxRange) {
      return lateBlockSC;
    } else {
      return getBlockDB + maxRange;
    }
  }
}
