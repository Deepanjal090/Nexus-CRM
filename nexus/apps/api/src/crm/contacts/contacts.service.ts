import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async findAll(workspaceId: string, params: { cursor?: string; limit?: number; search?: string }) {
    const { cursor, limit = 25, search } = params;
    const where: any = { workspaceId };
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    const contacts = await this.prisma.contact.findMany({
      where, take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { createdAt: 'desc' },
      include: { company: true },
    });
    return { data: contacts, meta: { cursor: contacts[contacts.length - 1]?.id || null, total: await this.prisma.contact.count({ where }), limit } };
  }

  async create(workspaceId: string, data: any) {
    return this.prisma.contact.create({ data: { ...data, workspaceId }, include: { company: true } });
  }

  async update(id: string, workspaceId: string, data: any) {
    return this.prisma.contact.updateMany({ where: { id, workspaceId }, data });
  }

  async delete(id: string, workspaceId: string) {
    return this.prisma.contact.deleteMany({ where: { id, workspaceId } });
  }
}
