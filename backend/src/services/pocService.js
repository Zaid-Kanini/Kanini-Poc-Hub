import { query } from '../db/pool.js';

/**
 * Return all POCs with domain name, team name, and tags array.
 * Supports optional filtering by domain name, search text, and status.
 */
export async function getPocs({ domain, search, status } = {}) {
  const conditions = [];
  const params = [];
  let idx = 1;

  if (domain && domain !== 'All POCs') {
    conditions.push(`d.name = $${idx++}`);
    params.push(domain);
  }

  if (status) {
    conditions.push(`p.status = $${idx++}`);
    params.push(status);
  }

  if (search) {
    conditions.push(`(
      p.title ILIKE $${idx} OR
      p.description ILIKE $${idx} OR
      EXISTS (
        SELECT 1 FROM poc_tags pt2
        JOIN tags t2 ON t2.id = pt2.tag_id
        WHERE pt2.poc_id = p.id AND t2.name ILIKE $${idx}
      )
    )`);
    params.push(`%${search}%`);
    idx++;
  }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

  const { rows } = await query(
    `SELECT
       p.id, p.title, p.description, p.icon,
       p.status, p.github_url, p.application_url,
       p.created_at, p.updated_at,
       d.name  AS domain,
       tm.name AS team,
       COALESCE(
         (SELECT json_agg(t.name ORDER BY t.name)
          FROM poc_tags pt JOIN tags t ON t.id = pt.tag_id
          WHERE pt.poc_id = p.id), '[]'
       ) AS tags
     FROM pocs p
     JOIN domains d  ON d.id = p.domain_id
     JOIN teams   tm ON tm.id = p.team_id
     ${where}
     ORDER BY p.id`,
    params
  );

  return rows;
}

export async function getPocById(id) {
  const { rows } = await query(
    `SELECT
       p.id, p.title, p.description, p.icon,
       p.status, p.github_url, p.application_url,
       p.created_at, p.updated_at,
       d.name  AS domain,
       tm.name AS team,
       COALESCE(
         (SELECT json_agg(t.name ORDER BY t.name)
          FROM poc_tags pt JOIN tags t ON t.id = pt.tag_id
          WHERE pt.poc_id = p.id), '[]'
       ) AS tags
     FROM pocs p
     JOIN domains d  ON d.id = p.domain_id
     JOIN teams   tm ON tm.id = p.team_id
     WHERE p.id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function getDomains() {
  const { rows } = await query('SELECT id, name FROM domains ORDER BY name');
  return rows;
}

export async function getCategories() {
  const { rows } = await query('SELECT name FROM domains ORDER BY name');
  return ['All POCs', ...rows.map((r) => r.name)];
}
