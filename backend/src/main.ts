import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSocketIO } from './shared/utils/socket-setup';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const PORT = process.env.PORT
  const httpServer = setupSocketIO(app);
  await app.listen(process.env.PORT ?? 4000);
}
main();
