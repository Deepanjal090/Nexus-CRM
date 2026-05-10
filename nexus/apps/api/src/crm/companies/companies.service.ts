import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async findAll(workspaceId: string, params: { cursor?: string; limit?: number }) {
    const { cursor, limit = 25 } = params;
    const where = { workspaceId };
    const companies = await this.prisma.company.findMany({
      where, take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { contacts: true, deals: true } } },
    });
    return { data: companies, meta: { cursor: companies[companies.length - 1]?.id || null, total: await this.prisma.company.count({ where }), limit } };
  }

  async create(workspaceId: string, data: any) { return this.prisma.company.create({ data: { ...data, workspaceId } }); }
  async update(id: string, workspaceId: string, data: any) { return this.prisma.company.updateMany({ where: { id, workspaceId }, data }); }
  async delete(id: string, workspaceId: string) { return this.prisma.company.deleteMany({ where: { id, workspaceId } }); }
}
