import { EntityRepository, Repository } from 'typeorm';
import { PoolEntity } from '../entities/pools.entity';

@EntityRepository(PoolEntity)
export class PoolRepository extends Repository<PoolEntity> {
  async findPoolById(id: number): Promise<PoolEntity> {
    const pool = await this.createQueryBuilder('pools').select('*').where('id = :id', { id: id }).getRawOne();
    return pool;
  }
  async createPool(data: any): Promise<void> {
    await this.createQueryBuilder().insert().into(PoolEntity).values([data]).execute();
  }

  async getAllPool(): Promise<PoolEntity[]> {
    const pools = await this.createQueryBuilder('pools').select('*').execute();
    return pools;
  }
}
