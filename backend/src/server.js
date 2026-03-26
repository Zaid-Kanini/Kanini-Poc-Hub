import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import pocRoutes from './routes/pocs.js';
import teamRoutes from './routes/teams.js';
import statsRoutes from './routes/stats.js';
import { authenticate } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ---------- Global middleware ----------
app.use(cors());
app.use(express.json());

// ---------- Health check ----------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---------- Public routes ----------
app.use('/api/auth', authRoutes);

// ---------- Protected routes ----------
app.use('/api/pocs', authenticate, pocRoutes);
app.use('/api/teams', authenticate, teamRoutes);
app.use('/api/stats', authenticate, statsRoutes);

// ---------- Global error handler ----------
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`Backend running → http://localhost:${PORT}`);
});

export default app;
