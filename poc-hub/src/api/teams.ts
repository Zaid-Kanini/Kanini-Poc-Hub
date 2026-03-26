import { get } from './client';

interface Team {
  id: number;
  name: string;
  created_at: string;
  members?: { id: number; email: string; displayName: string; role: string }[];
}

export function getTeams() {
  return get<Team[]>('/teams');
}

export function getTeamById(id: number) {
  return get<Team>(`/teams/${id}`);
}
