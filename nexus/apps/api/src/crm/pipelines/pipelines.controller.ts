import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('workspaces/:workspaceSlug/crm/pipelines')
@UseGuards(JwtAuthGuard)
export class PipelinesController {
  constructor(private svc: PipelinesService) {}
  @Get() findAll(@Param('workspaceSlug') ws: string) { return this.svc.findAll(ws); }
  @Post() create(@Param('workspaceSlug') ws: string, @Body() b: any) { return this.svc.create(ws, b); }
  @Delete(':id') delete(@Param('id') id: string, @Param('workspaceSlug') ws: string) { return this.svc.delete(id, ws); }
}
