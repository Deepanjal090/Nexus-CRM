import api from '@/lib/api';
import { ApiService } from '@/lib/api-service';

export class CRMService extends ApiService {
  async getLeads() {
    const res = await api.get(`${this.baseUrl}/crm/leads`);
    return res.data.data;
  }

  async getPipelines() {
    const res = await api.get(`${this.baseUrl}/crm/pipelines`);
    return res.data.data;
  }

  async createLead(data: any) {
    const res = await api.post(`${this.baseUrl}/crm/leads`, data);
    return res.data.data;
  }

  async convertLead(id: string) {
    const res = await api.post(`${this.baseUrl}/crm/leads/${id}/convert`);
    return res.data.data;
  }
}
