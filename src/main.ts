import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const port: number = 4000

  process.env.TZ = '-03:00'

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();//ira aceitar requisições em qualquer dominio nesse caro ira rodar no Localhost

  await app.listen(port);
  
}
bootstrap();
