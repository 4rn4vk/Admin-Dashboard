import { apiGet } from './client';

export interface DashboardStat {
  readonly label: string;
  readonly value: number;
  readonly delta: string;
}

export interface DashboardResponse {
  readonly stats: ReadonlyArray<DashboardStat>;
}

export async function fetchDashboard(): Promise<DashboardResponse> {
  return apiGet<DashboardResponse>('/api/dashboard');
}
