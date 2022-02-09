import * as dotenv from 'dotenv';
dotenv.config();
import * as config from 'config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

// const appPort = config.get<number>('app.port');
// const dnsSentry = config.get<string>('sentry_dns');
// const appEnv = config.get<string>('app.node_env');
// const prefix = config.get<string>('app.prefix');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // const appName = config.get<string>('app.name');
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('todolist')
    .setDescription('todolist')
    .setVersion('/api/v1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${'api/v1'}/docs`, app, document, {
    customSiteTitle: 'todolist',
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      displayRequestDuration: true,
    },
  });
  await app.listen(3000);
}
bootstrap();
