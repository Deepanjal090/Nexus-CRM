import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { DealsService } from './deals.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { WorkspaceGuard } from '../../common/guards/workspace.guard';

@Controller('workspaces/:workspaceSlug/crm/deals')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @Get()
  findAll(@Param() params: any, @Query() query: any) {
    return this.dealsService.findAll(params.workspace.id, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param() params: any) {
    return this.dealsService.findById(id, params.workspace.id);
  }

  @Post()
  create(@Param() params: any, @Body() body: any) {
    return this.dealsService.create(params.workspace.id, body);
  }

  @Patch(':id/move')
  moveStage(@Param('id') id: string, @Param() params: any, @Body('stageId') stageId: string) {
    return this.dealsService.moveStage(id, params.workspace.id, stageId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Param() params: any, @Body() body: any) {
    return this.dealsService.update(id, params.workspace.id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Param() params: any) {
    return this.dealsService.delete(id, params.workspace.id);
  }
}
