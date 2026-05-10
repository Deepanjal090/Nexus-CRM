import { useState, useEffect, useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import { Folder, Image, FileText, Film, File } from 'lucide-react';
import { DriveService } from '../services/drive.service';

export function useDriveController() {
  const { workspaceSlug } = useAppSelector((s) => s.auth);
  const [folders, setFolders] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  const driveService = useMemo(() => workspaceSlug ? new DriveService(workspaceSlug) : null, [workspaceSlug]);

  useEffect(() => {
    if (!driveService) return;

    const fetchData = async () => {
      try {
        const [foldersData, filesData] = await Promise.all([
          driveService.getFolders(),
          driveService.getFiles(),
        ]);

        setFolders(foldersData);
        setFiles(filesData.map((f: any) => ({
          ...f,
          icon: f.type === 'pdf' ? FileText : 
                f.type === 'image' ? Image : 
                f.type === 'video' ? Film : File,
          modified: new Date(f.updatedAt).toLocaleDateString(),
          size: (f.size / (1024 * 1024)).toFixed(1) + ' MB',
        })));
      } catch (err) {
        console.error('Failed to fetch drive data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [driveService]);

  return {
    folders,
    files,
    viewMode,
    setViewMode,
    loading,
  };
}
