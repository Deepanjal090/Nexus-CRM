import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Leads', 'Deals', 'Contacts', 'Companies', 'Tasks', 'Projects', 'Channels', 'Messages', 'Employees', 'Notifications'],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Workspaces
    getWorkspaces: builder.query({
      query: () => '/workspaces',
    }),

    // CRM - Leads
    getLeads: builder.query({
      query: (workspaceSlug) => `/workspaces/${workspaceSlug}/crm/leads`,
      providesTags: ['Leads'],
    }),
    createLead: builder.mutation({
      query: ({ workspaceSlug, ...body }) => ({
        url: `/workspaces/${workspaceSlug}/crm/leads`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Leads'],
    }),

    // CRM - Deals
    getDeals: builder.query({
      query: (workspaceSlug) => `/workspaces/${workspaceSlug}/crm/deals`,
      providesTags: ['Deals'],
    }),
    createDeal: builder.mutation({
      query: ({ workspaceSlug, ...body }) => ({
        url: `/workspaces/${workspaceSlug}/crm/deals`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Deals'],
    }),

    // CRM - Contacts
    getContacts: builder.query({
      query: (workspaceSlug) => `/workspaces/${workspaceSlug}/crm/contacts`,
      providesTags: ['Contacts'],
    }),
    createContact: builder.mutation({
      query: ({ workspaceSlug, ...body }) => ({
        url: `/workspaces/${workspaceSlug}/crm/contacts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contacts'],
    }),

    // Tasks
    getTasks: builder.query({
      query: (workspaceSlug) => `/workspaces/${workspaceSlug}/tasks`,
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation({
      query: ({ workspaceSlug, ...body }) => ({
        url: `/workspaces/${workspaceSlug}/tasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tasks'],
    }),

    // Projects
    getProjects: builder.query({
      query: (workspaceSlug) => `/workspaces/${workspaceSlug}/projects`,
      providesTags: ['Projects'],
    }),
    createProject: builder.mutation({
      query: ({ workspaceSlug, ...body }) => ({
        url: `/workspaces/${workspaceSlug}/projects`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetWorkspacesQuery,
  useGetLeadsQuery,
  useCreateLeadMutation,
  useGetDealsQuery,
  useCreateDealMutation,
  useGetContactsQuery,
  useCreateContactMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetProjectsQuery,
  useCreateProjectMutation,
} = api;
