import { useState } from 'react';
import { Folder, Image, FileText, Film } from 'lucide-react';

const mockFolders = [
  { id: 'f1', name: 'Marketing Assets', items: 24, color: '#3b82f6' },
  { id: 'f2', name: 'Engineering Docs', items: 18, color: '#6366f1' },
  { id: 'f3', name: 'Design System', items: 12, color: '#ec4899' },
  { id: 'f4', name: 'Contracts', items: 7, color: '#f59e0b' },
];

const mockFiles = [
  { id: '1', name: 'brand-guidelines.pdf', type: 'pdf', size: '2.4 MB', modified: 'May 8, 2026', icon: FileText },
  { id: '2', name: 'product-screenshot.png', type: 'image', size: '1.8 MB', modified: 'May 7, 2026', icon: Image },
  { id: '3', name: 'demo-video.mp4', type: 'video', size: '48 MB', modified: 'May 5, 2026', icon: Film },
  { id: '4', name: 'Q2-report.pdf', type: 'pdf', size: '3.1 MB', modified: 'May 4, 2026', icon: FileText },
];

export function useDriveController() {
  const [folders, setFolders] = useState(mockFolders);
  const [files, setFiles] = useState(mockFiles);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return {
    folders,
    files,
    viewMode,
    setViewMode,
  };
}
