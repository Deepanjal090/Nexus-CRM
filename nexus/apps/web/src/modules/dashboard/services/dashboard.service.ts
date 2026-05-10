import api from '@/lib/api';
import { ApiService } from '@/lib/api-service';

export class DashboardService extends ApiService {
  async getStats() {
    const res = await api.get(`${this.baseUrl}/dashboard/stats`);
    return res.data.data;
  }

  async getTeam() {
    const res = await api.get(`${this.baseUrl}/dashboard/team`);
    return res.data.data;
  }

  // Potential for future wiring
  async getTasksDistribution() {
    // This could call a real endpoint once implemented on the backend
    return [
      { label: 'To Do', value: 12 },
      { label: 'In Progress', value: 19 },
      { label: 'In Review', value: 5 },
      { label: 'Done', value: 28 },
    ];
  }
}
