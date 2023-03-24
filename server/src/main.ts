import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.DEV !== 'dev') {
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  }
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);
}
bootstrap();
