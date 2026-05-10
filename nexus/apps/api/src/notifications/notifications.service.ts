import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async findByUser(userId: string, workspaceId: string, params: { read?: boolean; limit?: number }) {
    const { read, limit = 20 } = params;
    const where: any = { userId, workspaceId };
    if (read !== undefined) where.read = read;
    return this.prisma.notification.findMany({ where, take: limit, orderBy: { createdAt: 'desc' } });
  }

  async create(data: { workspaceId: string; userId: string; type: string; title: string; body?: string; link?: string }) {
    return this.prisma.notification.create({ data });
  }

  async markAsRead(id: string, userId: string) {
    return this.prisma.notification.updateMany({ where: { id, userId }, data: { read: true } });
  }

  async markAllAsRead(userId: string, workspaceId: string) {
    return this.prisma.notification.updateMany({ where: { userId, workspaceId, read: false }, data: { read: true } });
  }

  async getUnreadCount(userId: string, workspaceId: string) {
    return this.prisma.notification.count({ where: { userId, workspaceId, read: false } });
  }
}
