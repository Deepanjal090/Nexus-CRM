import { z } from 'zod';

// ─── Auth ──────────────────────────────────
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
  twoFactorCode: z.string().length(6).optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8)
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain a number'),
});

// ─── Workspace ─────────────────────────────
export const createWorkspaceSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  logo: z.string().url().optional().nullable(),
  timezone: z.string().optional(),
  currency: z.string().length(3).optional(),
});

export const inviteMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(['ADMIN', 'MANAGER', 'MEMBER', 'GUEST']),
});

// ─── CRM ───────────────────────────────────
export const createLeadSchema = z.object({
  title: z.string().min(1).max(200),
  source: z.string().max(100).optional(),
  score: z.number().min(0).max(100).default(0),
  assigneeId: z.string().uuid().optional(),
  customFields: z.record(z.unknown()).default({}),
});

export const updateLeadSchema = createLeadSchema.partial().extend({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'CONVERTED']).optional(),
});

export const createDealSchema = z.object({
  title: z.string().min(1).max(200),
  value: z.number().min(0),
  currency: z.string().length(3).default('USD'),
  pipelineId: z.string().uuid(),
  stageId: z.string().uuid(),
  contactIds: z.array(z.string().uuid()).default([]),
  companyId: z.string().uuid().optional(),
  assigneeId: z.string().uuid().optional(),
  closeDate: z.string().datetime().optional(),
  customFields: z.record(z.unknown()).default({}),
});

export const updateDealSchema = createDealSchema.partial();

export const createContactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  companyId: z.string().uuid().optional(),
  customFields: z.record(z.unknown()).default({}),
});

export const updateContactSchema = createContactSchema.partial();

export const createCompanySchema = z.object({
  name: z.string().min(1).max(200),
  industry: z.string().max(100).optional(),
  size: z.string().max(50).optional(),
  website: z.string().url().optional(),
  customFields: z.record(z.unknown()).default({}),
});

export const updateCompanySchema = createCompanySchema.partial();

export const createPipelineSchema = z.object({
  name: z.string().min(1).max(100),
  stages: z.array(z.object({
    name: z.string().min(1).max(100),
    probability: z.number().min(0).max(100),
    color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  })).min(1),
});

export const createActivitySchema = z.object({
  type: z.enum(['NOTE', 'CALL', 'EMAIL', 'MEETING', 'TASK']),
  subject: z.string().min(1).max(200),
  body: z.string().optional(),
  dueAt: z.string().datetime().optional(),
  contactId: z.string().uuid().optional(),
  dealId: z.string().uuid().optional(),
});

// ─── Tasks ─────────────────────────────────
export const createTaskSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().optional(),
  status: z.enum(['BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE', 'CANCELLED']).default('TODO'),
  priority: z.enum(['URGENT', 'HIGH', 'MEDIUM', 'LOW', 'NONE']).default('MEDIUM'),
  assigneeIds: z.array(z.string().uuid()).default([]),
  projectId: z.string().uuid().optional(),
  sprintId: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  estimatedHours: z.number().min(0).optional(),
  tags: z.array(z.string()).default([]),
  parentId: z.string().uuid().optional(),
  customFields: z.record(z.unknown()).default({}),
});

export const updateTaskSchema = createTaskSchema.partial();

// ─── Projects ──────────────────────────────
export const createProjectSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#6366f1'),
  icon: z.string().max(50).optional(),
  memberIds: z.array(z.string().uuid()).default([]),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  status: z.enum(['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED']).optional(),
});

export const createMilestoneSchema = z.object({
  name: z.string().min(1).max(200),
  dueDate: z.string().datetime().optional(),
});

export const createSprintSchema = z.object({
  name: z.string().min(1).max(200),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

// ─── Chat ──────────────────────────────────
export const createChannelSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(['PUBLIC', 'PRIVATE', 'DM', 'GROUP']),
  description: z.string().max(500).optional(),
  memberIds: z.array(z.string().uuid()).default([]),
});

export const sendMessageSchema = z.object({
  content: z.string().min(1).max(10000),
  richContent: z.record(z.unknown()).optional(),
  attachments: z.array(z.string()).default([]),
  threadId: z.string().uuid().optional(),
  replyToId: z.string().uuid().optional(),
});

// ─── HR ────────────────────────────────────
export const createEmployeeSchema = z.object({
  userId: z.string().uuid(),
  departmentId: z.string().uuid().optional(),
  managerId: z.string().uuid().optional(),
  jobTitle: z.string().min(1).max(100),
  startDate: z.string().datetime(),
  skills: z.array(z.string()).default([]),
  bio: z.string().max(2000).optional(),
});

export const createDepartmentSchema = z.object({
  name: z.string().min(1).max(100),
  headId: z.string().uuid().optional(),
  parentId: z.string().uuid().optional(),
});

export const createAbsenceSchema = z.object({
  type: z.enum(['VACATION', 'SICK', 'PERSONAL', 'REMOTE', 'OTHER']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  note: z.string().max(500).optional(),
});

// ─── Automation ────────────────────────────
export const createWorkflowSchema = z.object({
  name: z.string().min(1).max(200),
  trigger: z.record(z.unknown()),
  nodes: z.array(z.record(z.unknown())).default([]),
  edges: z.array(z.record(z.unknown())).default([]),
  active: z.boolean().default(false),
});

// ─── Pagination ────────────────────────────
export const paginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.number().min(1).max(100).default(25),
  direction: z.enum(['forward', 'backward']).default('forward'),
});

export const sortSchema = z.object({
  field: z.string(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

// ─── Type exports ──────────────────────────
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type CreateDealInput = z.infer<typeof createDealSchema>;
export type CreateContactInput = z.infer<typeof createContactSchema>;
export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type CreateChannelInput = z.infer<typeof createChannelSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
