import { ProducerService } from './modules/kafka/producer.service';
import { Body, CACHE_MANAGER, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { MessageProducerService } from './modules/queues/message.producer.service';
import { ApiBody } from '@nestjs/swagger';
import { ConsumerService } from './modules/kafka/consumer.service';

@Controller()
export class AppController {
  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private messageProducerService: MessageProducerService,
    private producerService: ProducerService,
    private consumerService: ConsumerService,
  ) {}

  @Get()
  async getHello() {
    // await this.producerService.produce({
    //   topic: 'test',
    //   messages: [
    //     {
    //       value: 'hello world',
    //     },
    //   ],
    // });
    interface DatabaseConfig {
      type: 'mysql';
      host: string;
      port: number;
      username: string;
      password: string;
      database: string;
      entities: string[];
      logging: boolean;
    }
    console.log('config: ', process.env.MYSQL_HOST);
    const dbConfig = this.configService.get<DatabaseConfig>('database');
    console.log('dbhost: ', dbConfig);
    await this.cacheManager.set('key', 'hieu');
    console.log(await this.cacheManager.get('key'));
  }

  @ApiBody({
    type: String,
    schema: {
      example: '{ "msg": "hieu" }',
    },
  })
  @Post('/test-queue')
  sendMessage(@Body() body: any) {
    console.log('msg: ', body.msg);
    this.messageProducerService.sendMessage(body.msg);
  }

  // @ApiBody({
  //   type: String,
  //   schema: {
  //     example: '{ "msg": "hieu" }',
  //   },
  // })
  // @Post('/test-kafka')
  // async testKafka(@Body() data: any) {
  //   await this.producerService.produce({
  //     topic: 'test',
  //     messages: [{ value: data.msg }],
  //   });
  // }

  // @Post('/test-kafka')
  // async getKafka() {
  //   await th
  // }
}
