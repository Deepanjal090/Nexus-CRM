import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async findByChannel(channelId: string, params: { cursor?: string; limit?: number }) {
    const { cursor, limit = 50 } = params;
    const messages = await this.prisma.message.findMany({
      where: { channelId, deletedAt: null },
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        reactions: true,
        readReceipts: { select: { userId: true, readAt: true } },
      },
    });
    return { data: messages.reverse(), meta: { cursor: messages[0]?.id || null, total: await this.prisma.message.count({ where: { channelId } }), limit } };
  }

  async create(channelId: string, authorId: string, data: any) {
    const msg = await this.prisma.message.create({
      data: { channelId, authorId, ...data },
      include: { author: { select: { id: true, name: true, avatar: true } }, reactions: true },
    });
    await this.prisma.channel.update({ where: { id: channelId }, data: { updatedAt: new Date() } });
    return msg;
  }

  async update(id: string, authorId: string, content: string) {
    return this.prisma.message.update({ where: { id }, data: { content, editedAt: new Date() } });
  }

  async softDelete(id: string) {
    return this.prisma.message.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async addReaction(messageId: string, userId: string, emoji: string) {
    return this.prisma.reaction.upsert({
      where: { messageId_userId_emoji: { messageId, userId, emoji } },
      create: { messageId, userId, emoji },
      update: {},
    });
  }

  async removeReaction(messageId: string, userId: string, emoji: string) {
    return this.prisma.reaction.delete({ where: { messageId_userId_emoji: { messageId, userId, emoji } } });
  }
}
