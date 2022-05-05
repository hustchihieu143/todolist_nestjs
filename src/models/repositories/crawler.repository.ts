import { EntityRepository, Repository } from 'typeorm';
import { CrawlStatus } from '../entities/crawler';

@EntityRepository(CrawlStatus)
export class CrawlStatusRepository extends Repository<CrawlStatus> {
  public async findContractName(contract_name: string): Promise<any> {
    return await this.createQueryBuilder('crawl_status')
      .select('*')
      .where('crawl_status.contract_name = :contract_name', { contract_name })
      .execute();
  }
}
