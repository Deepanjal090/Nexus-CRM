import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('workspaces/:workspaceSlug/chat/channels/:channelId/messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private svc: MessagesService) {}

  @Get() findAll(@Param('channelId') chId: string, @Query() q: any) { return this.svc.findByChannel(chId, q); }
  @Post() create(@Param('channelId') chId: string, @CurrentUser('id') uid: string, @Body() b: any) { return this.svc.create(chId, uid, b); }
  @Patch(':id') update(@Param('id') id: string, @CurrentUser('id') uid: string, @Body('content') content: string) { return this.svc.update(id, uid, content); }
  @Delete(':id') delete(@Param('id') id: string) { return this.svc.softDelete(id); }

  @Post(':id/reactions') addReaction(@Param('id') id: string, @CurrentUser('id') uid: string, @Body('emoji') emoji: string) { return this.svc.addReaction(id, uid, emoji); }
  @Delete(':id/reactions/:emoji') removeReaction(@Param('id') id: string, @CurrentUser('id') uid: string, @Param('emoji') emoji: string) { return this.svc.removeReaction(id, uid, emoji); }
}
