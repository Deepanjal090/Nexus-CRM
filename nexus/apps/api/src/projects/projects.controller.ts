import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('workspaces/:workspaceSlug/projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private svc: ProjectsService) {}

  @Get() findAll(@Param('workspaceSlug') ws: string) { return this.svc.findAll(ws); }
  @Get(':id') findOne(@Param('id') id: string, @Param('workspaceSlug') ws: string) { return this.svc.findById(id, ws); }
  @Post() create(@Param('workspaceSlug') ws: string, @CurrentUser('id') uid: string, @Body() b: any) { return this.svc.create(ws, uid, b); }
  @Patch(':id') update(@Param('id') id: string, @Body() b: any) { return this.svc.update(id, b); }
  @Delete(':id') delete(@Param('id') id: string) { return this.svc.delete(id); }

  @Post(':id/milestones') createMilestone(@Param('id') id: string, @Body() b: any) { return this.svc.createMilestone(id, b); }
  @Post(':id/sprints') createSprint(@Param('id') id: string, @Body() b: any) { return this.svc.createSprint(id, b); }
}
