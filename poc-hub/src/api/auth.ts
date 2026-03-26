import { post, get } from './client';

interface User {
  id: number;
  email: string;
  display_name: string;
  avatar_url: string | null;
  created_at: string;
  last_login_at: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export function login(email: string) {
  return post<LoginResponse>('/auth/login', { email });
}

export function getMe() {
  return get<User>('/auth/me');
}
