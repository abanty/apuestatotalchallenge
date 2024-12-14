import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const PORT = process.env.PORT
  await app.listen(process.env.PORT ?? 4000);
}
main();
