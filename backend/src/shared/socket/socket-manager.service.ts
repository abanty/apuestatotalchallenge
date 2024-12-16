import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketManager {
  private io: Server;

  init(server: Server) {
    this.io = server;
  }

  getIo(): Server {
    if (!this.io) {
      throw new Error('Socket.io no está inicializado');
    }
    return this.io;
  }

  emitNotificationCreated(data: any) {
    const io = this.getIo();
    if (io.sockets.sockets.size > 0) {
      io.emit('notificationCreated', data);
    } else {
      console.warn('No hay clientes conectados, no se emitió el evento.');
    }
  }


  emitNotificationListening(data: any) {
    const io = this.getIo();
    if (io.sockets.sockets.size > 0) {
      io.emit('notificationListening', data);
    } else {
      console.warn('No hay clientes conectados, no se emitió el evento.');
    }
  }

}
