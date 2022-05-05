import { Logger, OnModuleInit } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: ['http://localhost:8080'] },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer() server: Server;
  users = 0;
  private logger: Logger = new Logger('AppGateway');

  onModuleInit() {
    console.log('chat');
  }

  handleConnection(client: Socket) {
    const clientId = client.id;
    this.users++;
    console.log('user connecting');
    this.server.emit('users', this.users);
    console.log(this.users);
  }

  handleDisconnect(client: Socket) {
    const clientId = client.id;
    this.users--;

    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('chat')
  async onChat(client, message) {
    client.broadcast.emit('chat', message);
  }
}
