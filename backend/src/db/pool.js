import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
});

/**
 * Run a single query against the pool.
 * @param {string} text  SQL string (use $1, $2… placeholders)
 * @param {any[]}  params  Positional parameters
 */
export function query(text, params) {
  return pool.query(text, params);
}

/**
 * Acquire a dedicated client (for transactions).
 * Caller MUST call client.release() when done.
 */
export function getClient() {
  return pool.connect();
}

export default pool;
