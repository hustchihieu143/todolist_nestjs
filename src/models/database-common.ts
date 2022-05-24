import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlStatusRepository } from './repositories/crawler.repository';
import { HistoryRepository } from './repositories/history.repository';
import { PoolRepository } from './repositories/pool.repository';

import { UserRepository } from './repositories/user.repository';

const commonRepositories = [UserRepository, CrawlStatusRepository, PoolRepository, HistoryRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(commonRepositories)],
  exports: [TypeOrmModule],
})
export class DatabaseCommonModule {}
