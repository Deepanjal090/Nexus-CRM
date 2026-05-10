import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { WorkspaceGuard } from '../common/guards/workspace.guard';

@Controller('workspaces/:workspaceSlug/dashboard')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class DashboardController {
  constructor(private prisma: PrismaService) {}

  @Get('stats')
  async getStats(@Req() req: any) {
    const workspaceId = req.workspace.id;

    // Aggregate real data from database
    const [leadsCount, dealsCount, tasksCount, employeesCount] = await Promise.all([
      this.prisma.lead.count({ where: { workspaceId } }),
      this.prisma.deal.count({ where: { workspaceId } }),
      this.prisma.task.count({ where: { workspaceId } }),
      this.prisma.employee.count({ where: { workspaceId } }),
    ]);

    // Aggregate Tasks by Status for Doughnut Chart
    const tasksGrouped = await this.prisma.task.groupBy({
      by: ['status'],
      where: { workspaceId },
      _count: { id: true },
    });

    const tasksMap = tasksGrouped.reduce((acc, curr) => {
      acc[curr.status] = curr._count.id;
      return acc;
    }, {} as Record<string, number>);

    const tasksData = [
      tasksMap['TODO'] || 0,
      tasksMap['IN_PROGRESS'] || 0,
      tasksMap['REVIEW'] || 0,
      tasksMap['DONE'] || 0,
    ];

    // Aggregate Deals by Month for Revenue Line Chart
    // Trailing 9 months
    const months = 9;
    const revenueData = new Array(months).fill(0);
    const now = new Date();
    
    // Calculate the start date (9 months ago, first day of the month)
    const startDate = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);

    const deals = await this.prisma.deal.findMany({
      where: {
        workspaceId,
        createdAt: { gte: startDate },
      },
      select: { value: true, createdAt: true },
    });

    deals.forEach((deal) => {
      const dealDate = new Date(deal.createdAt);
      // Calculate month index (0 to 8)
      const monthDiff = (now.getFullYear() - dealDate.getFullYear()) * 12 + (now.getMonth() - dealDate.getMonth());
      const index = months - 1 - monthDiff;
      if (index >= 0 && index < months) {
        revenueData[index] += deal.value;
      }
    });

    // Generate month labels for the trailing 9 months
    const monthLabels = Array.from({ length: months }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - months + 1 + i, 1);
      return d.toLocaleString('en-US', { month: 'short' });
    });

    return {
      stats: [
        { label: 'Total Leads', value: leadsCount.toString(), change: '+5%', up: true },
        { label: 'Active Deals', value: dealsCount.toString(), change: '+2', up: true },
        { label: 'Tasks Pending', value: tasksCount.toString(), change: '-3%', up: false },
        { label: 'Team Size', value: employeesCount.toString(), change: 'Stable', up: true },
      ],
      revenueData,
      monthLabels,
      tasksData,
    };
  }

  @Get('team')
  async getTeam(@Req() req: any) {
    const workspaceId = req.workspace.id;
    return this.prisma.employee.findMany({
      where: { workspaceId },
      include: { user: { select: { id: true, name: true } } },
    });
  }
}
