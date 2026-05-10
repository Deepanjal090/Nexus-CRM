import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [ChannelsController, MessagesController],
  providers: [ChannelsService, MessagesService, ChatGateway],
  exports: [ChannelsService, MessagesService],
})
export class ChatModule {}
