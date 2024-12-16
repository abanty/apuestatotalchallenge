import { Server } from 'socket.io';
import { INestApplication } from '@nestjs/common';
import { SocketManager } from '../socket/socket-manager.service';
import { createServer } from 'http';

export function setupSocketIO(app: INestApplication) {
  //   const httpServer = createServer(app.getHttpServer());
  const httpServer = app.getHttpServer();

  const socketManager = app.get(SocketManager);

  const io = new Server(httpServer, {
    transports: ['websocket', 'polling'],
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  socketManager.init(io);

  return httpServer;
}
