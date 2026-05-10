import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { DriveService } from './drive.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('workspaces/:workspaceSlug/drive')
@UseGuards(JwtAuthGuard)
export class DriveController {
  constructor(private svc: DriveService) {}

  @Get('folders') getFolders(@Param('workspaceSlug') ws: string, @Query('parentId') pid: string) { return this.svc.getFolders(ws, pid); }
  @Get('files') getFiles(@Param('workspaceSlug') ws: string, @Query('folderId') fid: string) { return this.svc.getFiles(ws, fid); }
  @Post('folders') createFolder(@Param('workspaceSlug') ws: string, @CurrentUser('id') uid: string, @Body() b: any) { return this.svc.createFolder(ws, uid, b); }
  @Post('files') createFile(@Param('workspaceSlug') ws: string, @CurrentUser('id') uid: string, @Body() b: any) { return this.svc.createFile(ws, uid, b); }
  @Delete('files/:id') deleteFile(@Param('id') id: string, @Param('workspaceSlug') ws: string) { return this.svc.deleteFile(id, ws); }
  @Delete('folders/:id') deleteFolder(@Param('id') id: string, @Param('workspaceSlug') ws: string) { return this.svc.deleteFolder(id, ws); }
}
