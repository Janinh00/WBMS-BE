import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default class SwaggerDocumentation {
  private app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  public serve(): void {
    // Configure swagger
    const config = new DocumentBuilder()
      .setTitle('Weighbridge Management System')
      .setDescription('Weighbridge Management System API Documentation')
      .setVersion('0.1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header'
        },
        'access-token'
      )
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api', this.app, document, {
      customSiteTitle: 'DSN - Weighbridge Management System'
    });
  }
}
