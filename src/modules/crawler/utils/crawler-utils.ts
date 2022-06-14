import { ContractDto } from '../dto/contract.dto';
import { CrawlStatusRepository } from '../../../models/repositories/crawler.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LogEventDto } from '../dto/log-event-crawler.dto';
import { CrawlStatus } from 'src/models/entities/crawler';
import Web3 from 'web3';

@Injectable()
export class CrawlUtils {
  constructor(private crawlStatusRepository: CrawlStatusRepository) {}
  async getBlockNumber(contract: ContractDto): Promise<number> {
    const log = await this.crawlStatusRepository.findContractName(contract.contractName);
    if (!log[0]) {
      const crawl = new CrawlStatus();
      crawl.contractAddress = contract.contract_address;
      crawl.blockNumber = contract.first_crawl_block;
      crawl.contractName = contract.contractName;
      await this.crawlStatusRepository.save(crawl, { reload: false });
      return crawl.blockNumber;
    }
    return Number(log[0].block_number);
  }

  async crawlEvent(fromBlockNumber: number, toBlockNumber: number, contract: ContractDto): Promise<LogEventDto[]> {
    const web3Provider = new Web3.providers.HttpProvider(process.env.RPC);
    const web3 = new Web3(web3Provider);
    const contractWeb3 = new web3.eth.Contract(contract.abi, contract.contract_address);

    const eventLogs: any = await contractWeb3.getPastEvents(
      'allEvents',
      {
        fromBlock: fromBlockNumber + 1,
        toBlock: toBlockNumber,
      },
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );
    console.log('eventLogs: ', eventLogs);
    return eventLogs;
  }

  async getLateBlock(config: ContractDto): Promise<number> {
    const web3Provider = new Web3.providers.HttpProvider(config.rpc);
    const web3 = new Web3(web3Provider);
    const lateBlock = web3.eth.getBlockNumber();
    return lateBlock;
  }
}
