import { stakingPoolContract, maxRange } from './config/crawler.config';
import { Injectable } from '@nestjs/common';
import { CrawlUtils } from './utils/crawler-utils';
import { InjectRepository } from '@nestjs/typeorm';
import { CrawlStatusRepository } from '../../models/repositories/crawler.repository';
import { ContractDto, GetBlockDto } from './dto/contract.dto';
import { HandlerEventUtils } from './utils/handler.utils';
import { LogEventDto } from './dto/log-event-crawler.dto';

@Injectable()
export class CrawlEvent {
  constructor(private crawlStatusRepository: CrawlStatusRepository) {}

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
    if (getBlockDB > lateBlockSC) {
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

    const events = await crawlUtils.crawlEvent(fromBlock, toBlock, contract);

    await this.handlerEvent(contract, events); // filter handler event of contract

    await this.updateBlockCrawlSuccess(toBlock, contract.contractName);
  }

  async handlerEvent(contract: ContractDto, events: LogEventDto[]): Promise<void> {
    // const handlerEventUtils = new HandlerEventUtils(kafkaService);
    // if (contract.contractName === mLandTokenContract.contractName) {
    //   await handlerEventUtils.handlerMLandTokenEvent(events);
    // }
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
