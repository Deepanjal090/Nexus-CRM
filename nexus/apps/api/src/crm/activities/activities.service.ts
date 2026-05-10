import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async findByEntity(workspaceId: string, params: { contactId?: string; dealId?: string }) {
    const where: any = { workspaceId };
    if (params.contactId) where.contactId = params.contactId;
    if (params.dealId) where.dealId = params.dealId;
    return this.prisma.activity.findMany({ where, orderBy: { createdAt: 'desc' }, include: { user: { select: { id: true, name: true, avatar: true } } } });
  }

  async create(workspaceId: string, userId: string, data: any) {
    return this.prisma.activity.create({ data: { ...data, workspaceId, userId } });
  }

  async complete(id: string) {
    return this.prisma.activity.update({ where: { id }, data: { completedAt: new Date() } });
  }
}
