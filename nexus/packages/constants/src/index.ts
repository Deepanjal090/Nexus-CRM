// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NEXUS — Shared Constants & Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── User Roles ────────────────────────────
export const UserRoles = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  MEMBER: 'MEMBER',
  GUEST: 'GUEST',
} as const;

// ─── Workspace Plans ───────────────────────
export const WorkspacePlans = {
  FREE: 'FREE',
  STARTER: 'STARTER',
  BUSINESS: 'BUSINESS',
  ENTERPRISE: 'ENTERPRISE',
} as const;

// ─── Task ──────────────────────────────────
export const TaskStatuses = {
  BACKLOG: 'BACKLOG',
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  DONE: 'DONE',
  CANCELLED: 'CANCELLED',
} as const;

export const TaskPriorities = {
  URGENT: 'URGENT',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
  NONE: 'NONE',
} as const;

export const TaskStatusLabels: Record<string, string> = {
  BACKLOG: 'Backlog',
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
  CANCELLED: 'Cancelled',
};

export const TaskPriorityLabels: Record<string, string> = {
  URGENT: 'Urgent',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
  NONE: 'None',
};

// ─── CRM ───────────────────────────────────
export const LeadStatuses = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  QUALIFIED: 'QUALIFIED',
  UNQUALIFIED: 'UNQUALIFIED',
  CONVERTED: 'CONVERTED',
} as const;

export const ActivityTypes = {
  NOTE: 'NOTE',
  CALL: 'CALL',
  EMAIL: 'EMAIL',
  MEETING: 'MEETING',
  TASK: 'TASK',
} as const;

// ─── Project ───────────────────────────────
export const ProjectStatuses = {
  PLANNING: 'PLANNING',
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON_HOLD',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
} as const;

export const SprintStatuses = {
  PLANNED: 'PLANNED',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
} as const;

// ─── Chat ──────────────────────────────────
export const ChannelTypes = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  DM: 'DM',
  GROUP: 'GROUP',
} as const;

// ─── HR ────────────────────────────────────
export const AbsenceTypes = {
  VACATION: 'VACATION',
  SICK: 'SICK',
  PERSONAL: 'PERSONAL',
  REMOTE: 'REMOTE',
  OTHER: 'OTHER',
} as const;

export const AbsenceStatuses = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

// ─── Automation ────────────────────────────
export const WorkflowExecutionStatuses = {
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

export const WorkflowTriggerTypes = {
  ENTITY_CREATED: 'ENTITY_CREATED',
  ENTITY_UPDATED: 'ENTITY_UPDATED',
  FIELD_CHANGED: 'FIELD_CHANGED',
  DATE_REACHED: 'DATE_REACHED',
  WEBHOOK_RECEIVED: 'WEBHOOK_RECEIVED',
  FORM_SUBMITTED: 'FORM_SUBMITTED',
  SCHEDULED: 'SCHEDULED',
} as const;

export const WorkflowActionTypes = {
  SEND_EMAIL: 'SEND_EMAIL',
  CREATE_TASK: 'CREATE_TASK',
  UPDATE_FIELD: 'UPDATE_FIELD',
  SEND_WEBHOOK: 'SEND_WEBHOOK',
  NOTIFY_USER: 'NOTIFY_USER',
  ASSIGN_STAGE: 'ASSIGN_STAGE',
  WAIT: 'WAIT',
} as const;

// ─── Socket.io Events ─────────────────────
export const SocketEvents = {
  // Messages
  MESSAGE_NEW: 'message:new',
  MESSAGE_UPDATED: 'message:updated',
  MESSAGE_DELETED: 'message:deleted',

  // Tasks
  TASK_CREATED: 'task:created',
  TASK_UPDATED: 'task:updated',
  TASK_DELETED: 'task:deleted',
  TASK_MOVED: 'task:moved',

  // Deals
  DEAL_UPDATED: 'deal:updated',
  DEAL_MOVED: 'deal:moved',

  // Notifications
  NOTIFICATION_NEW: 'notification:new',

  // Presence
  USER_ONLINE: 'user:online',
  USER_OFFLINE: 'user:offline',
  USER_TYPING_START: 'user:typing:start',
  USER_TYPING_STOP: 'user:typing:stop',

  // Automation
  WORKFLOW_EXECUTION_COMPLETE: 'workflow:execution:complete',

  // Connection
  JOIN_WORKSPACE: 'join:workspace',
  JOIN_CHANNEL: 'join:channel',
  LEAVE_CHANNEL: 'leave:channel',
} as const;

// ─── API Routes ────────────────────────────
export const API_PREFIX = '/api/v1';

export const ApiRoutes = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    GOOGLE: '/auth/google',
    GOOGLE_CALLBACK: '/auth/google/callback',
    GITHUB: '/auth/github',
    GITHUB_CALLBACK: '/auth/github/callback',
    TWO_FACTOR_SETUP: '/auth/2fa/setup',
    TWO_FACTOR_VERIFY: '/auth/2fa/verify',
  },
  WORKSPACES: '/workspaces',
  USERS: '/users',
} as const;

// ─── Defaults ──────────────────────────────
export const PAGINATION_DEFAULT_LIMIT = 25;
export const PAGINATION_MAX_LIMIT = 100;
export const FILE_MAX_SIZE_BYTES = 100 * 1024 * 1024; // 100MB
export const RATE_LIMIT_PER_USER = 100; // per minute
export const RATE_LIMIT_PER_WORKSPACE = 1000; // per minute
