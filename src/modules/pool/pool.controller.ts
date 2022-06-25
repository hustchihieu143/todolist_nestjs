import { PoolEntity } from 'src/models/entities/pools.entity';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { PoolService } from './pool.service';
import { ResponseDto } from 'src/shares/dtos/response.dto';
import { PoolDto } from './dtos/pool.dto';

@ApiTags('pool')
@Controller('pool')
export class PoolController {
  constructor(private poolService: PoolService) {}

  @Get()
  async getAllPool(@Query() poolDto?: PoolDto): Promise<ResponseDto<PoolEntity[]>> {
    const data = await this.poolService.getAllPool(poolDto?.account);

    return { data: data };
  }

  // @Get('totalStaked')
  // async getTotalStaked(): Promise<ResponseDto<number>> {
  //   const data = await this.poolService.getTotalStaked();
  // }
}
