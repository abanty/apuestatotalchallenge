import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSocketIO } from './shared/utils/socket-setup';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Configurar Socket.IO
  setupSocketIO(app);

  const PORT = process.env.PORT || 4000;

  await app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

main();
