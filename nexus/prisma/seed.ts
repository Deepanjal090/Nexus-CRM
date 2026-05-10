import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create Default Workspace
  const workspace = await prisma.workspace.upsert({
    where: { slug: 'nexus-hq' },
    update: {},
    create: {
      name: 'NEXUS HQ',
      slug: 'nexus-hq',
      plan: 'ENTERPRISE',
    },
  });
  console.log(`✅ Workspace created: ${workspace.name}`);

  // 2. Create Admin User
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'sood@nexus.local' },
    update: {},
    create: {
      email: 'sood@nexus.local',
      name: 'Sood Admin',
      passwordHash,
      emailVerified: true,
    },
  });
  console.log(`✅ User created: ${user.email}`);

  // 3. Link User to Workspace
  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      userId: user.id,
      role: 'ADMIN',
    },
  });
  console.log(`✅ User linked to Workspace`);

  // 4. Create Default Pipelines & Stages
  const leadPipeline = await prisma.pipeline.create({
    data: {
      workspaceId: workspace.id,
      name: 'Default Lead Pipeline',
      stages: {
        create: [
          { name: 'New Lead', order: 0, color: '#3b82f6' },
          { name: 'Contacted', order: 1, color: '#f59e0b' },
          { name: 'Qualified', order: 2, color: '#8b5cf6' },
          { name: 'Converted', order: 3, color: '#22c55e' },
        ],
      },
    },
  });
  console.log(`✅ Lead Pipeline created`);

  const dealPipeline = await prisma.pipeline.create({
    data: {
      workspaceId: workspace.id,
      name: 'Default Deal Pipeline',
      stages: {
        create: [
          { name: 'Discovery', order: 0, color: '#3b82f6' },
          { name: 'Proposal', order: 1, color: '#f59e0b' },
          { name: 'Negotiation', order: 2, color: '#8b5cf6' },
          { name: 'Closed Won', order: 3, color: '#22c55e' },
          { name: 'Closed Lost', order: 4, color: '#ef4444' },
        ],
      },
    },
  });
  console.log(`✅ Deal Pipeline created`);

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
