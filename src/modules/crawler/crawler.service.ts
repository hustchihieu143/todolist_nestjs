import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { CrawlEvent } from './crawler-event-handler';
import { InjectRepository } from '@nestjs/typeorm';
// import { settleEnvironment } from 'sota-common';
import { CrawlStatusRepository } from '../../models/repositories/crawler.repository';

@Console()
@Injectable()
export class CrawlerService {
  constructor(private crawlStatusRepository: CrawlStatusRepository) {}

  @Command({
    command: 'crawl',
    description: 'crawl',
  })
  async startValidationProcess(): Promise<void> {
    try {
      console.log('-------------start crawler------------------');
      const crawler = new CrawlEvent(this.crawlStatusRepository);
      await crawler.start();
    } catch (error) {}
  }
}
