import { query } from '../db/pool.js';

/** Find user by email. Returns null if not found. */
export async function findUserByEmail(email) {
  const normalised = email.trim().toLowerCase();

  const { rows } = await query(
    `UPDATE users SET last_login_at = now()
     WHERE email = $1
     RETURNING id, email, display_name, avatar_url, created_at, last_login_at`,
    [normalised]
  );

  return rows[0] ?? null;
}

export async function getUserById(id) {
  const { rows } = await query(
    'SELECT id, email, display_name, avatar_url, created_at, last_login_at FROM users WHERE id = $1',
    [id]
  );
  return rows[0] ?? null;
}
