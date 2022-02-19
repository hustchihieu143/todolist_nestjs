import { ProducerService } from './modules/kafka/producer.service';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

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
  }
}
