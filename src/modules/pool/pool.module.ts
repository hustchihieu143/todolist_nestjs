import { Module } from '@nestjs/common';
import { PoolController } from './pool.controller';
import { PoolService } from './pool.service';

@Module({
  imports: [],
  exports: [PoolService],
  controllers: [PoolController],
  providers: [PoolService],
})
export class PoolModule {}
