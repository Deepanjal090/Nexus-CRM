import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('workspaces/:workspaceSlug/crm/contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private svc: ContactsService) {}

  @Get()
  findAll(@Param('workspaceSlug') ws: string, @Query() q: any) { return this.svc.findAll(ws, q); }

  @Post()
  create(@Param('workspaceSlug') ws: string, @Body() body: any) { return this.svc.create(ws, body); }

  @Patch(':id')
  update(@Param('id') id: string, @Param('workspaceSlug') ws: string, @Body() body: any) { return this.svc.update(id, ws, body); }

  @Delete(':id')
  delete(@Param('id') id: string, @Param('workspaceSlug') ws: string) { return this.svc.delete(id, ws); }
}
