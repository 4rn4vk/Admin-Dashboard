import { apiGet, apiPost, apiPut, apiDelete } from './client';

export type AssessmentStatus = 'in-progress' | 'blocked' | 'scheduled' | 'complete';
export type AssessmentPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Assessment {
  readonly id: string;
  readonly name: string;
  readonly status: AssessmentStatus;
  readonly owner: string;
  readonly createdAt: string;
  readonly priority: AssessmentPriority;
}

export interface AssessmentsPagination {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
}

export interface AssessmentsResponse {
  readonly items: ReadonlyArray<Assessment>;
  readonly pagination: AssessmentsPagination;
}

export interface FetchAssessmentsParams {
  readonly page?: number;
  readonly limit?: number;
  readonly sortBy?: keyof Assessment;
  readonly sortOrder?: 'asc' | 'desc';
}

export interface CreateAssessmentData {
  readonly name: string;
  readonly status: AssessmentStatus;
  readonly owner: string;
  readonly priority: AssessmentPriority;
}

export interface UpdateAssessmentData {
  readonly name?: string;
  readonly status?: AssessmentStatus;
  readonly owner?: string;
  readonly priority?: AssessmentPriority;
}

export interface DeleteAssessmentResponse {
  readonly success: boolean;
}

export async function fetchAssessments(
  params: FetchAssessmentsParams = {}
): Promise<AssessmentsResponse> {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = params;
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy,
    sortOrder
  });
  return apiGet<AssessmentsResponse>(`/api/assessments?${queryParams}`);
}

export async function createAssessment(data: CreateAssessmentData): Promise<Assessment> {
  return apiPost<Assessment>('/api/assessments', data);
}

export async function updateAssessment(
  id: string,
  data: UpdateAssessmentData
): Promise<Assessment> {
  if (!id || typeof id !== 'string') {
    throw new TypeError('Assessment ID must be a non-empty string');
  }
  return apiPut<Assessment>(`/api/assessments/${id}`, data);
}

export async function deleteAssessment(id: string): Promise<DeleteAssessmentResponse> {
  if (!id || typeof id !== 'string') {
    throw new TypeError('Assessment ID must be a non-empty string');
  }
  return apiDelete<DeleteAssessmentResponse>(`/api/assessments/${id}`);
}
