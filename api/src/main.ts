import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await AppDataSource.initialize();
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
