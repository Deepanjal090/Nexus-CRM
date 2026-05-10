import api from '@/lib/api';

export class ApiService {
  protected workspaceSlug: string;

  constructor(workspaceSlug: string) {
    this.workspaceSlug = workspaceSlug;
  }

  protected get baseUrl() {
    return `/workspaces/${this.workspaceSlug}`;
  }
}
