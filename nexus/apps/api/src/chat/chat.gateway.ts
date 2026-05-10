import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
  namespace: '/ws',
})
export class ChatGateway {
  @WebSocketServer() server!: Server;

  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('join:channel')
  handleJoinChannel(@MessageBody() data: { channelId: string }, @ConnectedSocket() client: Socket) {
    client.join(`channel:${data.channelId}`);
    return { event: 'joined', data: { channelId: data.channelId } };
  }

  @SubscribeMessage('leave:channel')
  handleLeaveChannel(@MessageBody() data: { channelId: string }, @ConnectedSocket() client: Socket) {
    client.leave(`channel:${data.channelId}`);
  }

  @SubscribeMessage('message:send')
  async handleMessage(@MessageBody() data: { channelId: string; content: string; authorId: string }, @ConnectedSocket() client: Socket) {
    const message = await this.messagesService.create(data.channelId, data.authorId, { content: data.content });
    this.server.to(`channel:${data.channelId}`).emit('message:new', message);
    return message;
  }

  @SubscribeMessage('user:typing:start')
  handleTypingStart(@MessageBody() data: { channelId: string; userId: string; userName: string }, @ConnectedSocket() client: Socket) {
    client.to(`channel:${data.channelId}`).emit('user:typing:start', { userId: data.userId, userName: data.userName });
  }

  @SubscribeMessage('user:typing:stop')
  handleTypingStop(@MessageBody() data: { channelId: string; userId: string }, @ConnectedSocket() client: Socket) {
    client.to(`channel:${data.channelId}`).emit('user:typing:stop', { userId: data.userId });
  }
}
