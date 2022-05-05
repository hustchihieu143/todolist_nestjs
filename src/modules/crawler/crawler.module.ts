import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlStatusRepository } from 'src/models/repositories/crawler.repository';
import { CrawlEvent } from './crawler-event-handler';
import { CrawlerService } from './crawler.service';
import { CrawlUtils } from './utils/crawler-utils';

@Module({
  imports: [CrawlEvent, CrawlUtils, TypeOrmModule.forFeature([CrawlStatusRepository])],
  providers: [CrawlerService],
  exports: [CrawlerService, TypeOrmModule.forFeature([CrawlStatusRepository])],
})
export class CrawlerModule {}
