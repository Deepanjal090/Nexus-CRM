import { useState, useRef, useMemo, useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import { exportToExcel, downloadTemplate } from '@/lib/excel';
import api from '@/lib/api';

export function useDealsController() {
  const { user, workspaceSlug } = useAppSelector((s) => s.auth);
  const [deals, setDeals] = useState<any[]>([]);
  const [stages, setStages] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [viewAs, setViewAs] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const isSupervisor = user?.role === 'SUPERVISOR' || user?.role === 'ADMIN';

  useEffect(() => {
    if (!workspaceSlug) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [dealsRes, stagesRes, teamRes] = await Promise.all([
          api.get(`/workspaces/${workspaceSlug}/crm/deals`),
          api.get(`/workspaces/${workspaceSlug}/crm/pipelines`),
          api.get(`/workspaces/${workspaceSlug}/dashboard/team`),
        ]);

        setDeals(dealsRes.data);
        // Find the default pipeline and its stages
        const defaultPipeline = stagesRes.data[0];
        if (defaultPipeline) {
          setStages(defaultPipeline.stages);
        }
        setTeamMembers(teamRes.data.map((m: any) => ({
          id: m.userId,
          name: m.user.name,
        })));
      } catch (err) {
        console.error('Failed to fetch CRM data', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [workspaceSlug]);

  const visibleDeals = useMemo(() => {
    let base = deals.filter(deal => {
      const matchesSearch = deal.title.toLowerCase().includes(search.toLowerCase()) || 
                           (deal.company?.name || '').toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });

    if (isSupervisor && viewAs !== 'all') {
      return base.filter(d => d.assigneeId === viewAs);
    }

    return base;
  }, [deals, viewAs, isSupervisor, search]);

  const kanbanStages = stages.map(stage => ({
    ...stage,
    deals: visibleDeals.filter((d: any) => d.stageId === stage.id)
  }));

  const handleExport = () => {
    exportToExcel(
      visibleDeals.map(({ title, value, contact, company, stage }) => ({
        Title: title, Value: value, Contact: contact?.firstName || 'N/A', Company: company?.name || 'N/A', Stage: stage?.name,
      })),
      'nexus_deals', 'Deals'
    );
  };

  const handleCreateDeal = async (data: any) => {
    try {
      const res = await api.post(`/workspaces/${workspaceSlug}/crm/deals`, {
        title: data.title,
        value: parseFloat(data.value),
        stageId: data.stageId || stages[0]?.id,
        pipelineId: stages[0]?.pipelineId,
        companyId: data.companyId,
      });
      setDeals([res.data, ...deals]);
      return true;
    } catch (err) {
      console.error('Failed to create deal', err);
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
    handleExport,
    handleCreateDeal,
    handleTemplate: () => downloadTemplate(['Title', 'Value', 'Contact', 'Company', 'Stage'], 'deals', 'Deals'),
  };
}
