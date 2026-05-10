import api from '@/lib/api';
import { ApiService } from '@/lib/api-service';

export class ChatService extends ApiService {
  async getChannels() {
    const res = await api.get(`${this.baseUrl}/chat/channels`);
    return res.data?.data || res.data || [];
  }

  async getMessages(channelId: string) {
    const res = await api.get(`${this.baseUrl}/chat/channels/${channelId}/messages`);
    return res.data?.data || res.data || [];
  }

  async sendMessage(channelId: string, content: string) {
    const res = await api.post(`${this.baseUrl}/chat/channels/${channelId}/messages`, { content });
    return res.data?.data || res.data;
  }
}
