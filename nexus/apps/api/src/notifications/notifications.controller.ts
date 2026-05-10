import { Controller, Get, Post, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('workspaces/:workspaceSlug/notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private svc: NotificationsService) {}

  @Get() findAll(@CurrentUser('id') uid: string, @Param('workspaceSlug') ws: string, @Query() q: any) { return this.svc.findByUser(uid, ws, q); }
  @Get('unread-count') unreadCount(@CurrentUser('id') uid: string, @Param('workspaceSlug') ws: string) { return this.svc.getUnreadCount(uid, ws); }
  @Patch(':id/read') markRead(@Param('id') id: string, @CurrentUser('id') uid: string) { return this.svc.markAsRead(id, uid); }
  @Post('read-all') markAllRead(@CurrentUser('id') uid: string, @Param('workspaceSlug') ws: string) { return this.svc.markAllAsRead(uid, ws); }
}
