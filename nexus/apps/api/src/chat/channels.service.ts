import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}

  async findAll(workspaceId: string, userId: string) {
    return this.prisma.channel.findMany({
      where: { workspaceId, members: { some: { userId } } },
      include: {
        members: { include: { user: { select: { id: true, name: true, avatar: true } } } },
        messages: { take: 1, orderBy: { createdAt: 'desc' }, select: { content: true, createdAt: true, author: { select: { name: true } } } },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async create(workspaceId: string, userId: string, data: any) {
    const { memberIds, ...rest } = data;
    const allMembers = [...new Set([userId, ...(memberIds || [])])];
    return this.prisma.channel.create({
      data: {
        ...rest, workspaceId,
        members: { create: allMembers.map((uid: string) => ({ userId: uid })) },
      },
      include: { members: { include: { user: { select: { id: true, name: true, avatar: true } } } } },
    });
  }

  async addMember(channelId: string, userId: string) {
    return this.prisma.channelMember.create({ data: { channelId, userId } });
  }

  async removeMember(channelId: string, userId: string) {
    return this.prisma.channelMember.delete({ where: { channelId_userId: { channelId, userId } } });
  }
}
