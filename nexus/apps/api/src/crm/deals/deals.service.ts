import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  async findAll(workspaceId: string, params: { pipelineId?: string; stageId?: string; cursor?: string; limit?: number }) {
    const { pipelineId, stageId, cursor, limit = 25 } = params;
    const where: any = { workspaceId };
    if (pipelineId) where.pipelineId = pipelineId;
    if (stageId) where.stageId = stageId;

    const deals = await this.prisma.deal.findMany({
      where,
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { createdAt: 'desc' },
      include: { stage: true, company: true, contacts: { include: { contact: true } } },
    });

    return {
      data: deals,
      meta: { cursor: deals[deals.length - 1]?.id || null, total: await this.prisma.deal.count({ where }), limit },
    };
  }

  async findById(id: string, workspaceId: string) {
    return this.prisma.deal.findFirst({
      where: { id, workspaceId },
      include: { stage: true, pipeline: { include: { stages: { orderBy: { order: 'asc' } } } }, company: true, contacts: { include: { contact: true } } },
    });
  }

  async create(workspaceId: string, data: any) {
    const stage = await this.prisma.pipelineStage.findUnique({ where: { id: data.stageId } });
    return this.prisma.deal.create({
      data: { ...data, workspaceId, probability: stage?.probability || 0, contacts: undefined },
      include: { stage: true },
    });
  }

  async moveStage(id: string, workspaceId: string, stageId: string) {
    const stage = await this.prisma.pipelineStage.findUnique({ where: { id: stageId } });
    return this.prisma.deal.updateMany({
      where: { id, workspaceId },
      data: { stageId, probability: stage?.probability || 0 },
    });
  }

  async update(id: string, workspaceId: string, data: any) {
    return this.prisma.deal.updateMany({ where: { id, workspaceId }, data });
  }

  async delete(id: string, workspaceId: string) {
    return this.prisma.deal.deleteMany({ where: { id, workspaceId } });
  }
}
