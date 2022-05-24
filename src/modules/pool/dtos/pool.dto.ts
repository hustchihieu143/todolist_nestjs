import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class PoolDto {
  @ApiPropertyOptional({ type: String, required: false })
  @IsOptional()
  account: string;
}
