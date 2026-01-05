const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly _status: number,
    public readonly _statusText: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    const message = await safeErrorMessage(response);
    throw new ApiError(
      message ?? `Request failed with status ${response.status}`,
      response.status,
      response.statusText
    );
  }

  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const message = await safeErrorMessage(response);
    throw new ApiError(
      message ?? `Request failed with status ${response.status}`,
      response.status,
      response.statusText
    );
  }

  return response.json() as Promise<T>;
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const message = await safeErrorMessage(response);
    throw new ApiError(
      message ?? `Request failed with status ${response.status}`,
      response.status,
      response.statusText
    );
  }

  return response.json() as Promise<T>;
}

export async function apiDelete<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const message = await safeErrorMessage(response);
    throw new ApiError(
      message ?? `Request failed with status ${response.status}`,
      response.status,
      response.statusText
    );
  }

  return response.json() as Promise<T>;
}

async function safeErrorMessage(res: Response): Promise<string | null> {
  try {
    const data = await res.json();
    if (data && typeof data.message === 'string') return data.message;
  } catch {
    // ignore parse errors
  }
  return null;
}
