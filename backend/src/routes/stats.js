import { Router } from 'express';
import {
  getHeroStats,
  getGlobalStats,
  getFeaturedPoc,
  getPartners,
} from '../services/statsService.js';

const router = Router();

/** GET /api/stats/hero — hero section stats */
router.get('/hero', async (_req, res, next) => {
  try {
    res.json(await getHeroStats());
  } catch (err) {
    next(err);
  }
});

/** GET /api/stats/global — global stats strip */
router.get('/global', async (_req, res, next) => {
  try {
    res.json(await getGlobalStats());
  } catch (err) {
    next(err);
  }
});

/** GET /api/stats/featured — active featured POC */
router.get('/featured', async (_req, res, next) => {
  try {
    const featured = await getFeaturedPoc();
    if (!featured) return res.status(404).json({ error: 'No active featured POC' });
    res.json(featured);
  } catch (err) {
    next(err);
  }
});

/** GET /api/stats/partners — partner logos */
router.get('/partners', async (_req, res, next) => {
  try {
    res.json(await getPartners());
  } catch (err) {
    next(err);
  }
});

export default router;
