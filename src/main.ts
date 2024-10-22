import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HTTPMethods } from './enums/enums';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_URL,
    methods: HTTPMethods.GET,
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
