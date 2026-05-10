import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('workspaces/:workspaceSlug/crm/activities')
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
  constructor(private svc: ActivitiesService) {}
  @Get() findAll(@Param('workspaceSlug') ws: string, @Query() q: any) { return this.svc.findByEntity(ws, q); }
  @Post() create(@Param('workspaceSlug') ws: string, @CurrentUser('id') uid: string, @Body() b: any) { return this.svc.create(ws, uid, b); }
  @Patch(':id/complete') complete(@Param('id') id: string) { return this.svc.complete(id); }
}
