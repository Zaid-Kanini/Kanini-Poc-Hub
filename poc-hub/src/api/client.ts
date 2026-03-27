const API_BASE = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

console.log(
  `[API] Mode: ${import.meta.env.MODE} → Base URL: ${API_BASE}`
);

function getToken(): string | null {
  return localStorage.getItem('token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) ?? {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE}${path}`;
  const method = options.method || 'GET';
  console.log(`[API] ${method} ${url}`);

  const res = await fetch(url, { ...options, headers });
  const data = await res.json();
  if (!res.ok) {
    console.error(`[API] ${method} ${url} → ${res.status}`, data);
    throw new Error(data.error ?? 'Request failed');
  }
  console.log(`[API] ${method} ${url} → ${res.status}`);
  return data as T;
}

export function get<T>(path: string) {
  return request<T>(path);
}

export function post<T>(path: string, body: unknown) {
  return request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
