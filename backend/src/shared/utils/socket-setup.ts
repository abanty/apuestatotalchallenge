import { Server } from 'socket.io';
import { INestApplication } from '@nestjs/common';
import { SocketManager } from '../socket/socket-manager.service';
import { createServer } from 'http';

export function setupSocketIO(app: INestApplication) {
    const httpServer = createServer(app.getHttpServer());
  // const httpServer = app.getHttpServer();

  const socketManager = app.get(SocketManager);

  const io = new Server(httpServer, {
    transports: ['websocket', 'polling'],
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  socketManager.init(io);

  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });

  return httpServer;
}
