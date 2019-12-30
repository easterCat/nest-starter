import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { blue } from 'colors';
import { join } from 'path';
import { registerPartials } from 'hbs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  addEngine(app);

  const options = new DocumentBuilder()
    .setTitle('平头哥')
    .setDescription('后端API接口文档')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const port = 6333;
  await app.listen(port, () => {
    console.log(blue(`http server is start at ===> http://localhost:${port}`));
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

function addEngine(app) {
  // 设置public文件存放文件夹
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  // 设置静态文件存放文件夹
  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/static/',
  });
  // 设置视图文件夹
  app.setBaseViewsDir(join(__dirname, '..', '/views'));
  // 设置视图引擎
  app.setViewEngine('hbs');
  // 设置视图部件的文件夹
  registerPartials(join(__dirname, '..', '/views/partials'));
}
