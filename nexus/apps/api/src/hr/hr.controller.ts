import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { HrService } from './hr.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { WorkspaceGuard } from '../common/guards/workspace.guard';

@Controller('workspaces/:workspaceSlug/hr')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class HrController {
  constructor(private svc: HrService) {}

  @Get('employees') getEmployees(@Param() p: any) { return this.svc.getEmployees(p.workspace.id); }
  @Post('employees') createEmployee(@Param() p: any, @Body() b: any) { return this.svc.createEmployee(p.workspace.id, b); }
  @Get('departments') getDepartments(@Param() p: any) { return this.svc.getDepartments(p.workspace.id); }
  @Post('departments') createDepartment(@Param() p: any, @Body() b: any) { return this.svc.createDepartment(p.workspace.id, b); }
  @Get('absences') getAbsences(@Param() p: any) { return this.svc.getAbsences(p.workspace.id); }
  @Post('absences') createAbsence(@Body() b: any) { return this.svc.createAbsence(b.employeeId, b); }
  @Patch('absences/:id') updateAbsence(@Param('id') id: string, @Body('status') status: string) { return this.svc.updateAbsenceStatus(id, status); }
}
