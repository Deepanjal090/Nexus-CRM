import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(workspaceId: string, params: { status?: string; projectId?: string; assigneeId?: string; cursor?: string; limit?: number }) {
    const { status, projectId, assigneeId, cursor, limit = 50 } = params;
    const where: any = { workspaceId };
    if (status) where.status = status;
    if (projectId) where.projectId = projectId;
    if (assigneeId) where.assignees = { some: { userId: assigneeId } };

    const tasks = await this.prisma.task.findMany({
      where, take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        assignees: { include: { user: { select: { id: true, name: true, avatar: true } } } },
        project: { select: { id: true, name: true, color: true } },
        _count: { select: { subtasks: true, comments: true } },
      },
    });
    return { data: tasks, meta: { cursor: tasks[tasks.length - 1]?.id || null, total: await this.prisma.task.count({ where }), limit } };
  }

  async findById(id: string, workspaceId: string) {
    return this.prisma.task.findFirst({
      where: { id, workspaceId },
      include: {
        assignees: { include: { user: { select: { id: true, name: true, avatar: true } } } },
        project: true, subtasks: true, timeLogs: { include: { user: { select: { id: true, name: true } } } },
        comments: { include: { task: false }, orderBy: { createdAt: 'desc' } },
        dependencies: { include: { dependsOn: { select: { id: true, title: true, status: true } } } },
      },
    });
  }

  async create(workspaceId: string, userId: string, data: any) {
    const { assigneeIds, ...rest } = data;
    return this.prisma.task.create({
      data: {
        ...rest, workspaceId, createdById: userId,
        assignees: assigneeIds?.length ? { create: assigneeIds.map((uid: string) => ({ userId: uid })) } : undefined,
      },
      include: { assignees: { include: { user: { select: { id: true, name: true, avatar: true } } } } },
    });
  }

  async update(id: string, workspaceId: string, data: any) {
    const { assigneeIds, ...rest } = data;
    if (assigneeIds) {
      await this.prisma.taskAssignee.deleteMany({ where: { taskId: id } });
      await this.prisma.taskAssignee.createMany({ data: assigneeIds.map((uid: string) => ({ taskId: id, userId: uid })) });
    }
    return this.prisma.task.update({ where: { id }, data: rest });
  }

  async delete(id: string, workspaceId: string) {
    return this.prisma.task.deleteMany({ where: { id, workspaceId } });
  }

  async addTimeLog(taskId: string, userId: string, data: { startedAt: string; endedAt?: string; minutes: number; note?: string }) {
    const log = await this.prisma.timeLog.create({ data: { taskId, userId, ...data, startedAt: new Date(data.startedAt), endedAt: data.endedAt ? new Date(data.endedAt) : null } });
    await this.prisma.task.update({ where: { id: taskId }, data: { loggedHours: { increment: data.minutes / 60 } } });
    return log;
  }

  async addComment(taskId: string, authorId: string, content: string) {
    return this.prisma.taskComment.create({ data: { taskId, authorId, content } });
  }
}
