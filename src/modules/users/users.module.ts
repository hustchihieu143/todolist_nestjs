import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/repositories/user.repository';
import { RedisModule, RedisService } from 'nestjs-redis';
import { RedisModuleOptions } from 'nestjs-redis';
import { redisConfig } from 'src/configs/redis.config';
import { ClientsModule, Transport } from '@nestjs/microservices';

export const redis: RedisModuleOptions = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  db: parseInt(process.env.REDIS_DB),
  // password: process.env.REDIS_PASSWORD,
  // keyPrefix: '123',
};

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),

    // RedisModule.register({ ...redisConfig }),
    // CacheModule.register({
    //   store: redisStore,
    //   ...redisConfig,
    //   isGlobal: true,
    // }),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'hero',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'hero-consumer',
          },
        },
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
