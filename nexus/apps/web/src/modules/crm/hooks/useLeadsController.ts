import { useState, useRef, useMemo, useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import { exportToExcel, downloadTemplate } from '@/lib/excel';
import { CRMService } from '../services/crm.service';
import { DashboardService } from '../../dashboard/services/dashboard.service';

export function useLeadsController() {
  const { user, workspaceSlug } = useAppSelector((s) => s.auth);
  const [leads, setLeads] = useState<any[]>([]);
  const [stages, setStages] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [viewAs, setViewAs] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const isSupervisor = user?.role === 'SUPERVISOR' || user?.role === 'ADMIN';
  
  const crmService = useMemo(() => workspaceSlug ? new CRMService(workspaceSlug) : null, [workspaceSlug]);
  const dashboardService = useMemo(() => workspaceSlug ? new DashboardService(workspaceSlug) : null, [workspaceSlug]);

  useEffect(() => {
    if (!crmService || !dashboardService) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [leadsData, pipelines, team] = await Promise.all([
          crmService.getLeads(),
          crmService.getPipelines(),
          dashboardService.getTeam(),
        ]);

        setLeads(leadsData);
        // Using Lead pipeline (assuming it's the one with 'Lead' in name or just the first one)
        const leadPipeline = pipelines.find((p: any) => p.name.toLowerCase().includes('lead')) || pipelines[0];
        if (leadPipeline) {
          setStages(leadPipeline.stages);
        }
        
        setTeamMembers(team.map((m: any) => ({
          id: m.userId,
          name: m.user.name,
        })));
      } catch (err) {
        console.error('Failed to fetch Lead data', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [crmService, dashboardService]);

  const visibleLeads = useMemo(() => {
    let base = leads.filter(lead => {
      const matchesSearch = lead.title.toLowerCase().includes(search.toLowerCase()) || 
                           (lead.company?.name || '').toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });

    if (isSupervisor && viewAs !== 'all') {
      return base.filter(l => l.assigneeId === viewAs);
    }

    return base;
  }, [leads, viewAs, isSupervisor, search]);

  const kanbanStages = stages.map(stage => ({
    ...stage,
    leads: visibleLeads.filter((l: any) => l.stageId === stage.id)
  }));

  const handleCreateLead = async (data: any) => {
    if (!crmService) return false;
    try {
      const res = await crmService.createLead({
        title: data.title,
        contactName: data.contact,
        companyName: data.company,
        stageId: data.stageId || stages[0]?.id,
        source: 'MANUAL',
      });
      setLeads([res, ...leads]);
      return true;
    } catch (err) {
      console.error('Failed to create lead', err);
      return false;
    }
  };

  const handleConvertLead = async (id: string) => {
    if (!crmService) return false;
     try {
       await crmService.convertLead(id);
       setLeads(prev => prev.filter(l => l.id !== id));
       return true;
     } catch (err) {
       console.error('Failed to convert lead', err);
       return false;
     }
  };

  return {
    stages: kanbanStages,
    isSupervisor,
    viewAs,
    setViewAs,
    teamMembers,
    search,
    setSearch,
    isLoading,
    handleCreateLead,
    handleConvertLead,
    handleExport: () => exportToExcel(visibleLeads, 'leads', 'Leads'),
    handleTemplate: () => downloadTemplate(['Title', 'Contact', 'Company', 'Stage'], 'leads_template', 'Leads'),
  };
}
