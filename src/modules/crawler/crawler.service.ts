import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { CrawlEvent } from './crawler-event-handler';
import { InjectRepository } from '@nestjs/typeorm';
// import { settleEnvironment } from 'sota-common';
import { CrawlStatusRepository } from '../../models/repositories/crawler.repository';
import { PoolRepository } from 'src/models/repositories/pool.repository';
import { HistoryRepository } from 'src/models/repositories/history.repository';

@Console()
@Injectable()
export class CrawlerService {
  constructor(
    private crawlStatusRepository: CrawlStatusRepository,
    private poolRepository: PoolRepository,
    private historyRepository: HistoryRepository,
  ) {}

  @Command({
    command: 'crawl',
    description: 'crawl',
  })
  async startValidationProcess(): Promise<void> {
    try {
      console.log('-------------start crawler------------------');
      const crawler = new CrawlEvent(this.crawlStatusRepository, this.poolRepository, this.historyRepository);
      await crawler.start();
    } catch (error) {}
  }
}
