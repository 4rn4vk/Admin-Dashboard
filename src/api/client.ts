const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    const message = await safeErrorMessage(response);
    throw new Error(message ?? `Request failed with status ${response.status}`);
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
