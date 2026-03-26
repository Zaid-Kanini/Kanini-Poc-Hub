import { Router } from 'express';
import { getPocs, getPocById, getCategories } from '../services/pocService.js';

const router = Router();

/**
 * GET /api/pocs
 * Query params: ?domain=AI/ML&search=inventory&status=In+Production
 */
router.get('/', async (req, res, next) => {
  try {
    const { domain, search, status } = req.query;
    const pocs = await getPocs({ domain, search, status });
    res.json(pocs);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/pocs/categories
 * Returns the filter category list: ['All POCs', 'AI/ML', …]
 */
router.get('/categories', async (_req, res, next) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/pocs/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid POC id' });

    const poc = await getPocById(id);
    if (!poc) return res.status(404).json({ error: 'POC not found' });
    res.json(poc);
  } catch (err) {
    next(err);
  }
});

export default router;
