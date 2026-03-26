import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from './pool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seed() {
  const sql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
  console.log('Seeding database…');
  await query(sql);
  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
