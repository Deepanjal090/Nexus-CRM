import api from '@/lib/api';
import { ApiService } from '@/lib/api-service';

export class DriveService extends ApiService {
  async getFolders(parentId?: string) {
    const res = await api.get(`${this.baseUrl}/drive/folders`, { params: { parentId } });
    return res.data?.data || res.data || [];
  }

  async getFiles(folderId?: string) {
    const res = await api.get(`${this.baseUrl}/drive/files`, { params: { folderId } });
    return res.data?.data || res.data || [];
  }

  async createFolder(name: string, parentId?: string) {
    const res = await api.post(`${this.baseUrl}/drive/folders`, { name, parentId });
    return res.data?.data || res.data;
  }

  async uploadFile(file: File, folderId?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (folderId) formData.append('folderId', folderId);
    
    const res = await api.post(`${this.baseUrl}/drive/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data?.data || res.data;
  }
}
