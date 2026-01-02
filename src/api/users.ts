import { apiGet } from './client';

export interface User {
  id: string;
  name: string;
  role: string;
}

export interface UsersResponse {
  items: User[];
}

export async function fetchUsers(): Promise<UsersResponse> {
  return apiGet<UsersResponse>('/api/users');
}
