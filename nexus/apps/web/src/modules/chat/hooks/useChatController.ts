import { useState, useEffect, useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import { ChatService } from '../services/chat.service';

export function useChatController() {
  const { workspaceSlug } = useAppSelector((s) => s.auth);
  const [channels, setChannels] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const chatService = useMemo(() => workspaceSlug ? new ChatService(workspaceSlug) : null, [workspaceSlug]);

  useEffect(() => {
    if (!chatService) return;

    const fetchChannels = async () => {
      try {
        const data = await chatService.getChannels();
        setChannels(data);
        if (data.length > 0 && !activeChannelId) {
          setActiveChannelId(data[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch channels', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [chatService]);

  useEffect(() => {
    if (!chatService || !activeChannelId) return;

    const fetchMessages = async () => {
      try {
        const data = await chatService.getMessages(activeChannelId);
        setMessages(data.map((m: any) => ({
          author: m.author?.name || 'Unknown',
          avatar: m.author?.name?.charAt(0) || 'U',
          content: m.content,
          time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        })));
      } catch (err) {
        console.error('Failed to fetch messages', err);
      }
    };

    fetchMessages();
    // In a real app, we would subscribe to WebSockets here
  }, [chatService, activeChannelId]);

  const handleSendMessage = async () => {
    if (!input.trim() || !chatService || !activeChannelId) return;
    
    try {
      const msg = await chatService.sendMessage(activeChannelId, input);
      setMessages([...messages, {
        author: 'You',
        avatar: 'Y',
        content: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
      setInput('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  const activeChannelName = channels.find(c => c.id === activeChannelId)?.name || 'general';

  return {
    channels,
    messages,
    input,
    setInput,
    activeChannel: activeChannelName,
    setActiveChannel: (name: string) => {
      const ch = channels.find(c => c.name === name);
      if (ch) setActiveChannelId(ch.id);
    },
    handleSendMessage,
    loading,
  };
}
