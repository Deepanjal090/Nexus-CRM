import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Post()
  async create(@CurrentUser('id') userId: string, @Body() body: { name: string; slug: string }) {
    return this.workspacesService.create(userId, body);
  }

  @Get()
  async list(@CurrentUser('id') userId: string) {
    return this.workspacesService.getUserWorkspaces(userId);
  }

  @Get(':workspaceSlug')
  async getBySlug(@Param('workspaceSlug') slug: string) {
    return this.workspacesService.findBySlug(slug);
  }

  @Patch(':workspaceSlug')
  async update(
    @Param('workspaceSlug') slug: string,
    @Body() body: { name?: string; logo?: string; timezone?: string },
  ) {
    const ws = await this.workspacesService.findBySlug(slug);
    return this.workspacesService.update(ws.id, body);
  }

  @Post(':workspaceSlug/members')
  async addMember(
    @Param('workspaceSlug') slug: string,
    @Body() body: { userId: string; role?: string },
  ) {
    const ws = await this.workspacesService.findBySlug(slug);
    return this.workspacesService.addMember(ws.id, body.userId, body.role);
  }

  @Delete(':workspaceSlug/members/:userId')
  async removeMember(
    @Param('workspaceSlug') slug: string,
    @Param('userId') userId: string,
  ) {
    const ws = await this.workspacesService.findBySlug(slug);
    return this.workspacesService.removeMember(ws.id, userId);
  }
}
