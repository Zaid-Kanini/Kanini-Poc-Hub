import { get } from './client';

interface HeroStat {
  value: number;
  label: string;
}

interface GlobalStat {
  value: number;
  label: string;
  prefix: string;
  suffix: string;
}

interface FeaturedPoc {
  pocId: number | null;
  title: string;
  subtitle: string;
  description: string;
  deploymentStatus: string;
  stats: { value: string; label: string }[];
}

interface Partner {
  name: string;
  logo_url: string | null;
}

export function getHeroStats() {
  return get<HeroStat[]>('/stats/hero');
}

export function getGlobalStats() {
  return get<GlobalStat[]>('/stats/global');
}

export function getFeaturedPoc() {
  return get<FeaturedPoc>('/stats/featured');
}

export function getPartners() {
  return get<Partner[]>('/stats/partners');
}
