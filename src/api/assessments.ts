import { apiGet } from './client';

export type AssessmentStatus = 'in-progress' | 'blocked' | 'scheduled' | 'complete';

export interface Assessment {
  id: string;
  name: string;
  status: AssessmentStatus;
  owner: string;
}

export interface AssessmentsResponse {
  items: Assessment[];
}

export async function fetchAssessments(): Promise<AssessmentsResponse> {
  return apiGet<AssessmentsResponse>('/api/assessments');
}
