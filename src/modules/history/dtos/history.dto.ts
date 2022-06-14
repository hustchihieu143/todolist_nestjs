import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class HistoryDto {
  @ApiPropertyOptional({ type: String, required: false })
  @IsOptional()
  account: string;

  @ApiPropertyOptional({ type: Number, required: false })
  @IsOptional()
  poolId: number;
}
