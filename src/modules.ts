import { RedisModule } from 'nestjs-redis';
import { CacheModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import * as redisStore from 'cache-manager-redis-store';
import { redisConfig } from 'src/configs/redis.config';
import { BullModule } from '@nestjs/bull';
import { KafkaModule } from './modules/kafka/kafka.module';
import { AppModule } from './app.module';

const Modules = [
  UsersModule,
  AuthModule,
  KafkaModule,

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
