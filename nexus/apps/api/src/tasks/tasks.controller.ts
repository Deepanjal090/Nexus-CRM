import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { WorkspaceGuard } from '../common/guards/workspace.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('workspaces/:workspaceSlug/tasks')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class TasksController {
  constructor(private svc: TasksService) {}

  @Get() findAll(@Param() p: any, @Query() q: any) { return this.svc.findAll(p.workspace.id, q); }
  @Get(':id') findOne(@Param('id') id: string, @Param() p: any) { return this.svc.findById(id, p.workspace.id); }
  @Post() create(@Param() p: any, @CurrentUser('id') uid: string, @Body() b: any) { return this.svc.create(p.workspace.id, uid, b); }
  @Patch(':id') update(@Param('id') id: string, @Param() p: any, @Body() b: any) { return this.svc.update(id, p.workspace.id, b); }
  @Delete(':id') delete(@Param('id') id: string, @Param() p: any) { return this.svc.delete(id, p.workspace.id); }

  @Post(':id/time-logs')
  addTimeLog(@Param('id') id: string, @CurrentUser('id') uid: string, @Body() b: any) { return this.svc.addTimeLog(id, uid, b); }

  @Post(':id/comments')
  addComment(@Param('id') id: string, @CurrentUser('id') uid: string, @Body('content') content: string) { return this.svc.addComment(id, uid, content); }
}
