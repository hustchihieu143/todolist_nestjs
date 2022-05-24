import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();
import * as config from 'config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/shares/filters/http-exception.filter';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';

// const appPort = config.get<number>('app.port');
// const dnsSentry = config.get<string>('sentry_dns');
// const appEnv = config.get<string>('app.node_env');
// const prefix = config.get<string>('app.prefix');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.MQTT,
  //   options: {
  //     url: 'mqtt://localhost:1883',
  //     protocol: 'tcp',
  //   },
  // });

  // app.connectMicroservice({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['localhost:9093'],
  //     },
  //   },
  // });

  // app.startAllMicroservices();

  // const appName = config.get<string>('app.name');
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('todolist')
    .setDescription('todolist')
    .setVersion('/api/v1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${'api'}`, app, document, {
    customSiteTitle: 'todolist',
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      displayRequestDuration: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  // Exceptions
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
