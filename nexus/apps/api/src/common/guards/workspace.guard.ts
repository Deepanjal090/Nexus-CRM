import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WorkspaceGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const workspaceSlug = request.params.workspaceSlug;

    if (!workspaceSlug) return true;
    if (!user) throw new ForbiddenException('Authentication required');

    const workspace = await this.prisma.workspace.findUnique({
      where: { slug: workspaceSlug },
      include: {
        members: {
          where: { userId: user.id },
        },
      },
    });

    if (!workspace) throw new ForbiddenException('Workspace not found');
    if (workspace.members.length === 0) throw new ForbiddenException('Not a workspace member');

    // Attach workspace and member role to request
    request.workspace = workspace;
    request.workspaceMember = workspace.members[0];

    return true;
  }
}
