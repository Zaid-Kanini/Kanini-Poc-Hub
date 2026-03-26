import { query } from '../db/pool.js';

export async function getTeams() {
  const { rows } = await query('SELECT id, name, created_at FROM teams ORDER BY name');
  return rows;
}

export async function getTeamById(id) {
  const { rows } = await query(
    `SELECT t.id, t.name, t.created_at,
       COALESCE(
         (SELECT json_agg(json_build_object(
            'id', u.id, 'email', u.email,
            'displayName', u.display_name, 'role', tm.role
          ))
          FROM team_members tm JOIN users u ON u.id = tm.user_id
          WHERE tm.team_id = t.id
         ), '[]'
       ) AS members
     FROM teams t
     WHERE t.id = $1`,
    [id]
  );
  return rows[0] ?? null;
}
