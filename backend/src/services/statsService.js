import { query } from '../db/pool.js';

export async function getHeroStats() {
  const { rows } = await query('SELECT value::float, label FROM hero_stats ORDER BY sort_order');
  return rows;
}

export async function getGlobalStats() {
  const { rows } = await query(
    'SELECT value::float, label, prefix, suffix FROM global_stats ORDER BY sort_order'
  );
  return rows;
}

export async function getFeaturedPoc() {
  const { rows: [featured] } = await query(
    `SELECT id, title, subtitle, description, deployment_status
     FROM featured_pocs
     WHERE active = true
     ORDER BY created_at DESC
     LIMIT 1`
  );

  if (!featured) return null;

  const { rows: stats } = await query(
    'SELECT value, label FROM featured_poc_stats WHERE featured_poc_id = $1',
    [featured.id]
  );

  return {
    title: featured.title,
    subtitle: featured.subtitle,
    description: featured.description,
    deploymentStatus: featured.deployment_status,
    stats,
  };
}

export async function getPartners() {
  const { rows } = await query('SELECT name, logo_url FROM partners ORDER BY sort_order');
  return rows;
}
