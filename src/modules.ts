import { RedisModule } from 'nestjs-redis';
import { CacheModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import * as redisStore from 'cache-manager-redis-store';
import { redisConfig } from 'src/configs/redis.config';
import { BullModule } from '@nestjs/bull';
import { KafkaModule } from './modules/kafka/kafka.module';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './configs/database.config';
import { EventsModule } from './modules/events/events.module';
import { CrawlerModule } from './modules/crawler/crawler.module';
import { DatabaseCommonModule } from './models/database-common';
import { ConsoleModule } from 'nestjs-console';

const Modules = [
  UsersModule,
  AuthModule,
  ConfigModule.forRoot({ load: [databaseConfig] }),
  CacheModule.register(),
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
  // KafkaModule,

  // BullModule.forRoot({
  //   redis: redisConfig,
  // }),
  // CacheModule.register({
  //   store: redisStore,
  //   ...redisConfig,
  //   isGlobal: true,
  // }),
];
export default Modules;
