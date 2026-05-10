// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NEXUS — Shared Type Definitions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── Base ──────────────────────────────────
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Auth & Users ──────────────────────────
export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar: string | null;
  twoFactorEnabled: boolean;
  workspaces: WorkspaceMember[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RefreshToken extends BaseEntity {
  token: string;
  userId: string;
  expiresAt: string;
  revoked: boolean;
}

// ─── Workspace ─────────────────────────────
export interface Workspace extends BaseEntity {
  name: string;
  slug: string;
  logo: string | null;
  plan: WorkspacePlan;
  members: WorkspaceMember[];
}

export interface WorkspaceMember extends BaseEntity {
  workspaceId: string;
  userId: string;
  role: UserRole;
  user?: User;
  workspace?: Workspace;
  joinedAt: string;
}

export type WorkspacePlan = 'FREE' | 'STARTER' | 'BUSINESS' | 'ENTERPRISE';
export type UserRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'MEMBER' | 'GUEST';

// ─── CRM ───────────────────────────────────
export interface Lead extends BaseEntity {
  workspaceId: string;
  title: string;
  status: LeadStatus;
  source: string | null;
  score: number;
  assigneeId: string | null;
  assignee?: User;
  customFields: Record<string, unknown>;
  activities: Activity[];
  convertedAt: string | null;
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'UNQUALIFIED' | 'CONVERTED';

export interface Deal extends BaseEntity {
  workspaceId: string;
  title: string;
  value: number;
  currency: string;
  stageId: string;
  stage?: PipelineStage;
  pipelineId: string;
  pipeline?: Pipeline;
  probability: number;
  contactIds: string[];
  contacts?: Contact[];
  companyId: string | null;
  company?: Company;
  assigneeId: string | null;
  assignee?: User;
  closeDate: string | null;
  customFields: Record<string, unknown>;
  activities: Activity[];
}

export interface Contact extends BaseEntity {
  workspaceId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  companyId: string | null;
  company?: Company;
  deals: Deal[];
  activities: Activity[];
  customFields: Record<string, unknown>;
}

export interface Company extends BaseEntity {
  workspaceId: string;
  name: string;
  industry: string | null;
  size: string | null;
  website: string | null;
  contacts: Contact[];
  deals: Deal[];
  customFields: Record<string, unknown>;
}

export interface Pipeline extends BaseEntity {
  workspaceId: string;
  name: string;
  stages: PipelineStage[];
}

export interface PipelineStage extends BaseEntity {
  pipelineId: string;
  name: string;
  order: number;
  probability: number;
  color: string;
}

export interface Activity extends BaseEntity {
  workspaceId: string;
  type: ActivityType;
  subject: string;
  body: string | null;
  dueAt: string | null;
  completedAt: string | null;
  contactId: string | null;
  dealId: string | null;
  userId: string;
  user?: User;
}

export type ActivityType = 'NOTE' | 'CALL' | 'EMAIL' | 'MEETING' | 'TASK';

// ─── Tasks & Projects ─────────────────────
export interface Task extends BaseEntity {
  workspaceId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeIds: string[];
  assignees?: User[];
  projectId: string | null;
  project?: Project;
  sprintId: string | null;
  dueDate: string | null;
  startDate: string | null;
  estimatedHours: number | null;
  loggedHours: number;
  subtasks: Task[];
  parentId: string | null;
  tags: string[];
  customFields: Record<string, unknown>;
  createdById: string;
}

export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' | 'CANCELLED';
export type TaskPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';

export interface Project extends BaseEntity {
  workspaceId: string;
  name: string;
  description: string | null;
  color: string;
  icon: string | null;
  status: ProjectStatus;
  ownerId: string;
  owner?: User;
  memberIds: string[];
  members?: User[];
  milestones: Milestone[];
  sprints: Sprint[];
}

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'ARCHIVED';

export interface Milestone extends BaseEntity {
  projectId: string;
  name: string;
  dueDate: string | null;
  completionPercent: number;
}

export interface Sprint extends BaseEntity {
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
  status: SprintStatus;
}

export type SprintStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED';

export interface TimeLog extends BaseEntity {
  taskId: string;
  userId: string;
  user?: User;
  startedAt: string;
  endedAt: string | null;
  minutes: number;
  note: string | null;
}

// ─── Chat ──────────────────────────────────
export interface Channel extends BaseEntity {
  workspaceId: string;
  name: string;
  type: ChannelType;
  description: string | null;
  memberIds: string[];
  members?: User[];
  lastMessageAt: string | null;
  unreadCount?: number;
}

export type ChannelType = 'PUBLIC' | 'PRIVATE' | 'DM' | 'GROUP';

export interface Message extends BaseEntity {
  channelId: string;
  authorId: string;
  author?: User;
  content: string;
  richContent: Record<string, unknown> | null;
  attachments: string[];
  reactions: Reaction[];
  threadId: string | null;
  replyToId: string | null;
  editedAt: string | null;
  deletedAt: string | null;
  readBy: string[];
}

export interface Reaction {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
}

// ─── Drive ─────────────────────────────────
export interface DriveFolder extends BaseEntity {
  workspaceId: string;
  name: string;
  parentId: string | null;
  children: DriveFolder[];
  files: DriveFile[];
  createdById: string;
}

export interface DriveFile extends BaseEntity {
  workspaceId: string;
  folderId: string | null;
  name: string;
  mimeType: string;
  size: number;
  storageKey: string;
  versions: FileVersion[];
  uploadedById: string;
  uploadedBy?: User;
}

export interface FileVersion extends BaseEntity {
  fileId: string;
  storageKey: string;
  size: number;
  uploadedById: string;
}

// ─── HR ────────────────────────────────────
export interface Employee extends BaseEntity {
  workspaceId: string;
  userId: string;
  user?: User;
  departmentId: string | null;
  department?: Department;
  managerId: string | null;
  manager?: Employee;
  jobTitle: string;
  startDate: string;
  skills: string[];
  bio: string | null;
}

export interface Department extends BaseEntity {
  workspaceId: string;
  name: string;
  headId: string | null;
  head?: Employee;
  parentId: string | null;
  parent?: Department;
  employees: Employee[];
}

export interface Absence extends BaseEntity {
  employeeId: string;
  employee?: Employee;
  type: AbsenceType;
  startDate: string;
  endDate: string;
  status: AbsenceStatus;
  note: string | null;
}

export type AbsenceType = 'VACATION' | 'SICK' | 'PERSONAL' | 'REMOTE' | 'OTHER';
export type AbsenceStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

// ─── Automation ────────────────────────────
export interface Workflow extends BaseEntity {
  workspaceId: string;
  name: string;
  trigger: Record<string, unknown>;
  nodes: Record<string, unknown>[];
  edges: Record<string, unknown>[];
  active: boolean;
}

export interface WorkflowExecution extends BaseEntity {
  workflowId: string;
  status: WorkflowExecutionStatus;
  startedAt: string;
  completedAt: string | null;
  log: Record<string, unknown>[];
}

export type WorkflowExecutionStatus = 'RUNNING' | 'COMPLETED' | 'FAILED';

// ─── Notifications ─────────────────────────
export interface Notification extends BaseEntity {
  workspaceId: string;
  userId: string;
  type: string;
  title: string;
  body: string | null;
  read: boolean;
  link: string | null;
}

// ─── API Response Types ────────────────────
export interface ApiResponse<T> {
  data: T;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: {
    cursor: string | null;
    total: number;
    limit: number;
  };
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

// ─── Pagination ────────────────────────────
export interface PaginationParams {
  cursor?: string;
  limit?: number;
  direction?: 'forward' | 'backward';
}

export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}
