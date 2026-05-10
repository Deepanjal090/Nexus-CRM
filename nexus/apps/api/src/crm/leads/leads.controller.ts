import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { WorkspaceGuard } from '../../common/guards/workspace.guard';

@Controller('workspaces/:workspaceSlug/crm/leads')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Get()
  async findAll(@Param('workspaceSlug') slug: string, @Query() query: any, @Req() req: any) {
    const workspaceId = req.workspace.id;
    return this.leadsService.findAll(workspaceId, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.leadsService.findById(id, req.workspace.id);
  }

  @Post()
  async create(@Body() body: any, @Req() req: any) {
    return this.leadsService.create(req.workspace.id, body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    return this.leadsService.update(id, req.workspace.id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    return this.leadsService.delete(id, req.workspace.id);
  }
}
