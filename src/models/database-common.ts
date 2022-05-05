import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlStatusRepository } from './repositories/crawler.repository';

import { UserRepository } from './repositories/user.repository';

const commonRepositories = [UserRepository, CrawlStatusRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(commonRepositories)],
  exports: [TypeOrmModule],
})
export class DatabaseCommonModule {}
