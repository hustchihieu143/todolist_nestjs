import { ProducerService } from './modules/kafka/producer.service';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly producerService: ProducerService) {}

  @Get()
  async getHello() {
    await this.producerService.produce({
      topic: 'test',
      messages: [
        {
          value: 'hello world',
        },
      ],
    });
  }
}
