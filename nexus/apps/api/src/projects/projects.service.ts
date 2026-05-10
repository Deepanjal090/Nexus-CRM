import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(workspaceId: string) {
    return this.prisma.project.findMany({
      where: { workspaceId }, orderBy: { createdAt: 'desc' },
      include: {
        owner: { select: { id: true, name: true, avatar: true } },
        members: { include: { user: { select: { id: true, name: true, avatar: true } } } },
        _count: { select: { tasks: true, milestones: true, sprints: true } },
      },
    });
  }

  async findById(id: string, workspaceId: string) {
    return this.prisma.project.findFirst({
      where: { id, workspaceId },
      include: {
        owner: { select: { id: true, name: true, avatar: true } },
        members: { include: { user: { select: { id: true, name: true, avatar: true } } } },
        milestones: { orderBy: { dueDate: 'asc' } },
        sprints: { orderBy: { startDate: 'asc' } },
        _count: { select: { tasks: true } },
      },
    });
  }

  async create(workspaceId: string, ownerId: string, data: any) {
    const { memberIds, ...rest } = data;
    return this.prisma.project.create({
      data: {
        ...rest, workspaceId, ownerId,
        members: { create: [{ userId: ownerId, role: 'OWNER' }, ...(memberIds || []).map((uid: string) => ({ userId: uid }))] },
      },
      include: { owner: { select: { id: true, name: true } }, _count: { select: { tasks: true } } },
    });
  }

  async update(id: string, data: any) { return this.prisma.project.update({ where: { id }, data }); }
  async delete(id: string) { return this.prisma.project.delete({ where: { id } }); }

  async createMilestone(projectId: string, data: any) { return this.prisma.milestone.create({ data: { ...data, projectId } }); }
  async createSprint(projectId: string, data: any) { return this.prisma.sprint.create({ data: { ...data, projectId, startDate: new Date(data.startDate), endDate: new Date(data.endDate) } }); }
}
