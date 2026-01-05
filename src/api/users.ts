import { apiGet } from './client';

export type UserRole = 'Admin' | 'Reviewer' | 'Contributor';
export type UserStatus = 'active' | 'inactive';

export interface User {
  readonly id: string;
  readonly name: string;
  readonly role: UserRole;
  readonly email: string;
  readonly status: UserStatus;
}

export interface UsersResponse {
  readonly items: ReadonlyArray<User>;
}

export interface FetchUsersParams {
  readonly search?: string;
  readonly role?: UserRole | '';
  readonly status?: UserStatus | '';
}

export async function fetchUsers(params: FetchUsersParams = {}): Promise<UsersResponse> {
  const { search = '', role = '', status = '' } = params;
  const queryParams = new URLSearchParams();

  if (search) queryParams.append('search', search);
  if (role) queryParams.append('role', role);
  if (status) queryParams.append('status', status);

  const queryString = queryParams.toString();
  return apiGet<UsersResponse>(`/api/users${queryString ? `?${queryString}` : ''}`);
}
