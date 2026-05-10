import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { HrService } from './hr.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { WorkspaceGuard } from '../common/guards/workspace.guard';

@Controller('workspaces/:workspaceSlug/hr')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class HrController {
  constructor(private svc: HrService) {}

  @Get('employees') getEmployees(@Req() req: any) { return this.svc.getEmployees(req.workspace.id); }
  @Post('employees') createEmployee(@Req() req: any, @Body() b: any) { return this.svc.createEmployee(req.workspace.id, b); }
  @Get('departments') getDepartments(@Req() req: any) { return this.svc.getDepartments(req.workspace.id); }
  @Post('departments') createDepartment(@Req() req: any, @Body() b: any) { return this.svc.createDepartment(req.workspace.id, b); }
  @Get('absences') getAbsences(@Req() req: any) { return this.svc.getAbsences(req.workspace.id); }
  @Post('absences') createAbsence(@Body() b: any) { return this.svc.createAbsence(b.employeeId, b); }
  @Patch('absences/:id') updateAbsence(@Param('id') id: string, @Body('status') status: string) { return this.svc.updateAbsenceStatus(id, status); }
}
