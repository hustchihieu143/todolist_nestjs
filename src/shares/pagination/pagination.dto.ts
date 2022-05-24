import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationInput {
  @ApiPropertyOptional({ example: 1, type: Number, required: false })
  // @Transform(({ value }) => Number(value))
  // @IsPositive()
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ example: 20, type: Number, required: false })
  // @Transform(({ value }) => Number(value))
  // @Max(100)
  // @IsPositive()
  @IsOptional()
  limit?: number = 20;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsOptional()
  skip?: number = 0;
}
