import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('history')
@Controller('history')
export class HistoryController {}
