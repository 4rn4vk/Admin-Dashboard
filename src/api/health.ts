import { apiGet } from './client';

export interface HealthResponse {
  readonly status: string;
  readonly timestamp: string;
}

export async function fetchHealth(): Promise<HealthResponse> {
  return apiGet<HealthResponse>('/api/health');
}
