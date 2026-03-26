import { get } from './client';
import type { PocItem } from '../data/pocData';

interface PocFilters {
  domain?: string;
  search?: string;
  status?: string;
}

export function getPocs(filters: PocFilters = {}) {
  const params = new URLSearchParams();
  if (filters.domain && filters.domain !== 'All POCs') params.set('domain', filters.domain);
  if (filters.search) params.set('search', filters.search);
  if (filters.status) params.set('status', filters.status);
  const qs = params.toString();
  return get<PocItem[]>(`/pocs${qs ? `?${qs}` : ''}`);
}

export function getPocById(id: number) {
  return get<PocItem>(`/pocs/${id}`);
}

export function getCategories() {
  return get<string[]>('/pocs/categories');
}
