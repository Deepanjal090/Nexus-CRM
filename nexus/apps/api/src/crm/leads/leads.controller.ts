import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { WorkspaceGuard } from '../../common/guards/workspace.guard';

@Controller('workspaces/:workspaceSlug/crm/leads')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Get()
  async findAll(@Param('workspaceSlug') slug: string, @Query() query: any, @Param() params: any) {
    const req = params as any;
    const workspaceId = req.workspace?.id;
    return this.leadsService.findAll(workspaceId, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Param() params: any) {
    return this.leadsService.findById(id, (params as any).workspace?.id);
  }

  @Post()
  async create(@Body() body: any, @Param() params: any) {
    return this.leadsService.create((params as any).workspace?.id, body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any, @Param() params: any) {
    return this.leadsService.update(id, (params as any).workspace?.id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Param() params: any) {
    return this.leadsService.delete(id, (params as any).workspace?.id);
  }
}
