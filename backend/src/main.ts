import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.enableCors({ credentials: true, origin: true });

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const config = new DocumentBuilder()
    .setTitle('Облачное хранилище')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // if (process.env.NODE_ENV === 'production') {
  //   await app.listen(process.env.PORT, process.env.APP_IP, () =>
  //     console.log(
  //       `App started on port http://${process.env.APP_IP}:${process.env.PORT}/...`,
  //     ),
  //   );
  // } else {
  //   await app.listen(process.env.PORT || 7777, () =>
  //     console.log(`Server started on PORT = ${process.env.PORT || 7777}`),
  //   );
  // }

  await app.listen(process.env.PORT || 7777);
}
bootstrap();
