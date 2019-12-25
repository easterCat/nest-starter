import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { blue } from 'colors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = 6333;
  await app.listen(port);
  console.log(blue(`http server is start at ===> http://localhost:${port}`));
}
bootstrap();
