import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { DbService } from './db/db.service';
import { ENV } from './utils/constants';
import SwaggerDocumentation from './settings/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // httpsOptions: { key: fs.readFileSync(ENV.SSL_KEY_FILE), cert: fs.readFileSync(ENV.SSL_CRT_FILE) }
  });

  // printEnvVar();

  app.enableCors({
    origin: ['http://localhost:8000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  });

  app.use(cookieParser());

  // app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // Jika ingin diblock data selain data di dto harus dirubah whitelist = true
      transform: true, // Jika true, maka DataIn akan di transform sesuai dengan deklarinnya, tidak perlu menggunakan ParseXXXPipe
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  const prismaService = app.get(DbService);
  await prismaService.enableShutdownHooks(app);

  // const configSwagger = new DocumentBuilder()
  //   .setTitle('Weighbridge Management System')
  //   .setDescription('Weighbridge Management System API Documentation')
  //   .setVersion('0.1')
  //   .build();

  // const document = SwaggerModule.createDocument(app, configSwagger);
  // SwaggerModule.setup('api', app, document, {
  //   customSiteTitle: 'DSN - Weighbridge Management System'
  // });

  const swaggerDoc = new SwaggerDocumentation(app);
  swaggerDoc.serve();

  await app.listen(ENV.WBMS_APP_PORT || 6001);
}

bootstrap();

const printEnvVar = () => {
  const config = new ConfigService();

  const WBMS_APP_PORT = config.get('WBMS_APP_PORT');

  const WBMS_DB_DOMAIN = config.get('WBMS_DB_DOMAIN');
  const WBMS_DB_PORT = config.get('WBMS_DB_PORT');

  const WBMS_DB_USER = config.get('WBMS_DB_USER');
  const WBMS_DB_PASSWORD = config.get('WBMS_DB_PASSWORD');
  const WBMS_DB_NAME = config.get('WBMS_DB_NAME');
  const WBMS_DB_URL = config.get('WBMS_DB_URL');

  const WBMS_SITE_TYPE = config.get('WBMS_SITE_TYPE');

  const WBMS_WB_IP = config.get('WBMS_WB_IP');
  const WBMS_WB_PORT = config.get('WBMS_WB_PORT');
  const WBMS_WB_MIN_WEIGHT = config.get('WBMS_WB_MIN_WEIGHT');
  const WBMS_WB_STABLE_PERIOD = config.get('WBMS_WB_STABLE_PERIOD');

  const WBMS_SEMAI_API_URL = config.get('WBMS_SEMAI_API_URL');
  const WBMS_SEMAI_API_KEY = config.get('WBMS_SEMAI_API_KEY');

  console.log('ENV:');
  console.log(ENV);

  console.log(`WBMS_APP_PORT: ${WBMS_APP_PORT}`);
  console.log('==============');
  console.log(`WBMS_DB_DOMAIN: ${WBMS_DB_DOMAIN}`);
  console.log(`WBMS_DB_PORT: ${WBMS_DB_PORT}`);
  console.log(`WBMS_DB_USER: ${WBMS_DB_USER}`);
  console.log(`WBMS_DB_PASSWORD: ${WBMS_DB_PASSWORD}`);
  console.log(`WBMS_DB_NAME: ${WBMS_DB_NAME}`);
  console.log(`WBMS_DB_URL: ${WBMS_DB_URL}`);
  console.log('==============');
  console.log(`WBMS_SITE_TYPE: ${WBMS_SITE_TYPE}`);
  console.log('==============');
  console.log(`WBMS_WB_IP: ${WBMS_WB_IP}`);
  console.log(`WBMS_WB_PORT: ${WBMS_WB_PORT}`);
  console.log(`WBMS_WB_MIN_WEIGHT: ${WBMS_WB_MIN_WEIGHT}`);
  console.log(`WBMS_WB_STABLE_PERIOD: ${WBMS_WB_STABLE_PERIOD}`);
  console.log('==============');
  console.log(`WBMS_SEMAI_API_URL: ${WBMS_SEMAI_API_URL}`);
  console.log(`WBMS_SEMAI_API_KEY: ${WBMS_SEMAI_API_KEY}`);
};
