import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PipelinesService {
  constructor(private prisma: PrismaService) {}

  async findAll(workspaceId: string) {
    return this.prisma.pipeline.findMany({
      where: { workspaceId },
      include: { stages: { orderBy: { order: 'asc' } }, _count: { select: { deals: true } } },
    });
  }

  async create(workspaceId: string, data: { name: string; stages: { name: string; probability: number; color: string }[] }) {
    return this.prisma.pipeline.create({
      data: {
        name: data.name, workspaceId,
        stages: { create: data.stages.map((s, i) => ({ ...s, order: i })) },
      },
      include: { stages: { orderBy: { order: 'asc' } } },
    });
  }

  async delete(id: string, workspaceId: string) {
    return this.prisma.pipeline.deleteMany({ where: { id, workspaceId } });
  }
}
