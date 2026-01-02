import { apiGet } from './client';

export interface DashboardStat {
  label: string;
  value: number;
  delta: string;
}

export interface DashboardResponse {
  stats: DashboardStat[];
}

export async function fetchDashboard(): Promise<DashboardResponse> {
  return apiGet<DashboardResponse>('/api/dashboard');
}
