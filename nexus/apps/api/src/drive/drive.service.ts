import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DriveService {
  constructor(private prisma: PrismaService) {}

  async getFolders(workspaceId: string, parentId?: string) {
    return this.prisma.driveFolder.findMany({
      where: { workspaceId, parentId: parentId || null },
      include: { _count: { select: { children: true, files: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async getFiles(workspaceId: string, folderId?: string) {
    return this.prisma.driveFile.findMany({
      where: { workspaceId, folderId: folderId || null },
      include: { uploadedBy: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createFolder(workspaceId: string, userId: string, data: { name: string; parentId?: string }) {
    return this.prisma.driveFolder.create({ data: { name: data.name, workspaceId, parentId: data.parentId, createdById: userId } });
  }

  async createFile(workspaceId: string, userId: string, data: { name: string; mimeType: string; size: number; storageKey: string; folderId?: string }) {
    return this.prisma.driveFile.create({ data: { ...data, workspaceId, uploadedById: userId } });
  }

  async deleteFile(id: string, workspaceId: string) {
    return this.prisma.driveFile.deleteMany({ where: { id, workspaceId } });
  }

  async deleteFolder(id: string, workspaceId: string) {
    return this.prisma.driveFolder.deleteMany({ where: { id, workspaceId } });
  }
}
