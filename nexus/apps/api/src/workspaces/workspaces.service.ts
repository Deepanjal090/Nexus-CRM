import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkspacesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { name: string; slug: string }) {
    const existing = await this.prisma.workspace.findUnique({ where: { slug: data.slug } });
    if (existing) throw new ConflictException('Workspace slug already taken');

    return this.prisma.workspace.create({
      data: {
        name: data.name,
        slug: data.slug,
        members: {
          create: { userId, role: 'OWNER' },
        },
      },
      include: { members: { include: { user: true } } },
    });
  }

  async findBySlug(slug: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { slug },
      include: {
        members: {
          include: {
            user: { select: { id: true, name: true, email: true, avatar: true } },
          },
        },
      },
    });
    if (!workspace) throw new NotFoundException('Workspace not found');
    return workspace;
  }

  async getUserWorkspaces(userId: string) {
    const memberships = await this.prisma.workspaceMember.findMany({
      where: { userId },
      include: {
        workspace: true,
      },
    });
    return memberships.map((m) => ({ ...m.workspace, role: m.role }));
  }

  async addMember(workspaceId: string, userId: string, role: string = 'MEMBER') {
    return this.prisma.workspaceMember.create({
      data: { workspaceId, userId, role },
      include: { user: true },
    });
  }

  async updateMemberRole(workspaceId: string, userId: string, role: string) {
    return this.prisma.workspaceMember.update({
      where: { workspaceId_userId: { workspaceId, userId } },
      data: { role },
    });
  }

  async removeMember(workspaceId: string, userId: string) {
    return this.prisma.workspaceMember.delete({
      where: { workspaceId_userId: { workspaceId, userId } },
    });
  }

  async update(id: string, data: { name?: string; logo?: string; timezone?: string; currency?: string }) {
    return this.prisma.workspace.update({ where: { id }, data });
  }
}
