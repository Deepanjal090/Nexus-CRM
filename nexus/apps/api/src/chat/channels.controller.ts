import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('workspaces/:workspaceSlug/chat/channels')
@UseGuards(JwtAuthGuard)
export class ChannelsController {
  constructor(private svc: ChannelsService) {}
  @Get() findAll(@Param('workspaceSlug') ws: string, @CurrentUser('id') uid: string) { return this.svc.findAll(ws, uid); }
  @Post() create(@Param('workspaceSlug') ws: string, @CurrentUser('id') uid: string, @Body() b: any) { return this.svc.create(ws, uid, b); }
  @Post(':id/members') addMember(@Param('id') id: string, @Body('userId') uid: string) { return this.svc.addMember(id, uid); }
}
