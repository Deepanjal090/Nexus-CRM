import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HrService {
  constructor(private prisma: PrismaService) {}

  async getEmployees(workspaceId: string) {
    return this.prisma.employee.findMany({
      where: { workspaceId },
      include: { user: { select: { id: true, name: true, email: true, avatar: true } }, department: true, manager: { include: { user: { select: { name: true } } } } },
    });
  }

  async createEmployee(workspaceId: string, data: any) { return this.prisma.employee.create({ data: { ...data, workspaceId, startDate: new Date(data.startDate) } }); }

  async getDepartments(workspaceId: string) {
    return this.prisma.department.findMany({
      where: { workspaceId },
      include: { head: { include: { user: { select: { name: true } } } }, _count: { select: { employees: true } } },
    });
  }

  async createDepartment(workspaceId: string, data: any) { return this.prisma.department.create({ data: { ...data, workspaceId } }); }

  async getAbsences(workspaceId: string) {
    return this.prisma.absence.findMany({
      where: { employee: { workspaceId } },
      include: { employee: { include: { user: { select: { name: true, avatar: true } } } } },
      orderBy: { startDate: 'desc' },
    });
  }

  async createAbsence(employeeId: string, data: any) {
    return this.prisma.absence.create({ data: { ...data, employeeId, startDate: new Date(data.startDate), endDate: new Date(data.endDate) } });
  }

  async updateAbsenceStatus(id: string, status: string) { return this.prisma.absence.update({ where: { id }, data: { status } }); }
}
