import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { WorkspaceGuard } from '../common/guards/workspace.guard';

@Controller('workspaces/:workspaceSlug/dashboard')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class DashboardController {
  constructor(private prisma: PrismaService) {}

  @Get('stats')
  async getStats(@Param() params: any) {
    const workspaceId = params.workspace.id;

    // Aggregate real data from database
    const [leadsCount, dealsCount, tasksCount, employeesCount] = await Promise.all([
      this.prisma.lead.count({ where: { workspaceId } }),
      this.prisma.deal.count({ where: { workspaceId } }),
      this.prisma.task.count({ where: { workspaceId } }),
      this.prisma.employee.count({ where: { workspaceId } }),
    ]);

    // Mocking the trend data for now but using real base counts
    return {
      stats: [
        { label: 'Total Leads', value: leadsCount.toString(), change: '+5%', up: true },
        { label: 'Active Deals', value: dealsCount.toString(), change: '+2', up: true },
        { label: 'Tasks Pending', value: tasksCount.toString(), change: '-3%', up: false },
        { label: 'Team Size', value: employeesCount.toString(), change: 'Stable', up: true },
      ],
      revenueData: [65000, 78000, 90000, 81000, 112000, 125000, 115000, 138000, 148250], // Mock revenue for now
    };
  }

  @Get('team')
  async getTeam(@Param() params: any) {
    const workspaceId = params.workspace.id;
    return this.prisma.employee.findMany({
      where: { workspaceId },
      include: { user: { select: { id: true, name: true } } },
    });
  }
}
