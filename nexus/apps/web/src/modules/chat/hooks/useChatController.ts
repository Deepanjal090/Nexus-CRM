import { useState } from 'react';

const channels = [
  { name: 'general', type: 'PUBLIC', unread: 3 },
  { name: 'engineering', type: 'PUBLIC', unread: 0 },
  { name: 'design', type: 'PUBLIC', unread: 1 },
  { name: 'sales', type: 'PRIVATE', unread: 0 },
  { name: 'random', type: 'PUBLIC', unread: 5 },
];

const initialMessages = [
  { author: 'Sarah Chen', avatar: 'S', content: 'Hey team, just pushed the new dashboard design to staging. Let me know what you think!', time: '10:30 AM' },
  { author: 'Alex Rivera', avatar: 'A', content: 'Looks great! The KPI cards animation is really smooth. One thing — can we make the sidebar transition a bit faster?', time: '10:32 AM' },
  { author: 'Mike Johnson', avatar: 'M', content: 'Agreed on the sidebar. Also, the search bar Cmd+K shortcut isn\'t working on Firefox. I\'ll file a bug.', time: '10:35 AM' },
  { author: 'Emily Park', avatar: 'E', content: 'I\'ll handle the Firefox fix. Should be a quick one — probably a keyboard event issue.', time: '10:38 AM' },
  { author: 'Sarah Chen', avatar: 'S', content: 'Perfect. Let\'s also plan the chat module review for tomorrow. I\'ll send a calendar invite.', time: '10:42 AM' },
];

export function useChatController() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [activeChannel, setActiveChannel] = useState('general');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      author: 'You',
      avatar: 'Y',
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return {
    channels,
    messages,
    input,
    setInput,
    activeChannel,
    setActiveChannel,
    handleSendMessage,
  };
}
