import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async findAll(workspaceId: string, params: { cursor?: string; limit?: number; status?: string }) {
    const { cursor, limit = 25, status } = params;
    const where: any = { workspaceId };
    if (status) where.status = status;

    const leads = await this.prisma.lead.findMany({
      where,
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: leads,
      meta: { cursor: leads[leads.length - 1]?.id || null, total: await this.prisma.lead.count({ where }), limit },
    };
  }

  async findById(id: string, workspaceId: string) {
    return this.prisma.lead.findFirst({ where: { id, workspaceId } });
  }

  async create(workspaceId: string, data: any) {
    return this.prisma.lead.create({ data: { ...data, workspaceId } });
  }

  async update(id: string, workspaceId: string, data: any) {
    return this.prisma.lead.updateMany({ where: { id, workspaceId }, data });
  }

  async delete(id: string, workspaceId: string) {
    return this.prisma.lead.deleteMany({ where: { id, workspaceId } });
  }
}
