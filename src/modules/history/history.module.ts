import { HistoryController } from './history.controller';
import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';

@Module({
  imports: [],
  exports: [HistoryService],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
