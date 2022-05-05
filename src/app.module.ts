import { TestConsumer } from './test.consumer';

import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { masterConfig, reportConfig } from './configs/database.config';
import Modules from './modules';
import { MessageProducerService } from './modules/queues/message.producer.service';
import { MessageConsumer } from './modules/queues/message.consumer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/models/entities/**/*{.ts,.js}'],
      logging: true,
      logger: 'file',
      migrationsTableName: 'migrate_tables',
      synchronize: false,
      // Allow both start:prod and start:dev to use migrations
      // __dirname is either dist or src folder, meaning either
      // the compiled js in prod or the ts in dev.
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        // location of migration should be inside src folder
        // to be compiled into dist/ folder.
        migrationsDir: 'src/migrations',
      },
    }),
    // TypeOrmModule.forRoot(reportConfig),

    ...Modules,
  ],
  providers: [MessageProducerService, MessageConsumer],
  controllers: [],
})
export class AppModule {}
