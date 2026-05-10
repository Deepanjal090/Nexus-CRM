import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('workspaces/:workspaceSlug/crm/companies')
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private svc: CompaniesService) {}
  @Get() findAll(@Param('workspaceSlug') ws: string, @Query() q: any) { return this.svc.findAll(ws, q); }
  @Post() create(@Param('workspaceSlug') ws: string, @Body() b: any) { return this.svc.create(ws, b); }
  @Patch(':id') update(@Param('id') id: string, @Param('workspaceSlug') ws: string, @Body() b: any) { return this.svc.update(id, ws, b); }
  @Delete(':id') delete(@Param('id') id: string, @Param('workspaceSlug') ws: string) { return this.svc.delete(id, ws); }
}
