import { Global, Module } from '@nestjs/common';
import { SocketManager } from './socket-manager.service';

@Global()
@Module({
  providers: [SocketManager],
  exports: [SocketManager],  // Exportar el servicio para que esté disponible en toda la aplicación
})
export class SocketModule {}
