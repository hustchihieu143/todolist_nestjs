import { MqttModule1 } from './modules/mqtt/mqtt.module';
import { RedisModule } from 'nestjs-redis';
import { CacheModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

import { BullModule } from '@nestjs/bull';

import { ConfigModule } from '@nestjs/config';
import databaseConfig from './configs/database.config';
import { EventsModule } from './modules/events/events.module';
import { CrawlerModule } from './modules/crawler/crawler.module';
import { DatabaseCommonModule } from './models/database-common';
import { ConsoleModule } from 'nestjs-console';
import { PoolModule } from './modules/pool/pool.module';

const Modules = [
  UsersModule,
  PoolModule,
  AuthModule,
  ConfigModule.forRoot({ load: [databaseConfig] }),
  MqttModule1,
  CrawlerModule,
  DatabaseCommonModule,
  ConsoleModule,
  BullModule.forRoot({
    // Bull Queue
    redis: {
      host: 'localhost',
      port: 6380,
    },
  }),
  BullModule.registerQueue({
    name: 'message-queue',
  }),
  EventsModule,
];
export default Modules;
