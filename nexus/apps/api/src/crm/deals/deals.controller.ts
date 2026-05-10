import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { DealsService } from './deals.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { WorkspaceGuard } from '../../common/guards/workspace.guard';

@Controller('workspaces/:workspaceSlug/crm/deals')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @Get()
  findAll(@Req() req: any, @Query() query: any) {
    return this.dealsService.findAll(req.workspace.id, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.dealsService.findById(id, req.workspace.id);
  }

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.dealsService.create(req.workspace.id, body);
  }

  @Patch(':id/move')
  moveStage(@Param('id') id: string, @Req() req: any, @Body('stageId') stageId: string) {
    return this.dealsService.moveStage(id, req.workspace.id, stageId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() body: any) {
    return this.dealsService.update(id, req.workspace.id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: any) {
    return this.dealsService.delete(id, req.workspace.id);
  }
}
