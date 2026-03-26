import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from './pool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  console.log('Running schema migration…');
  await query(sql);
  console.log('Migration complete.');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
