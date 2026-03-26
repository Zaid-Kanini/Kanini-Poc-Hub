import { Router } from 'express';
import { getTeams, getTeamById } from '../services/teamService.js';

const router = Router();

/** GET /api/teams */
router.get('/', async (_req, res, next) => {
  try {
    const teams = await getTeams();
    res.json(teams);
  } catch (err) {
    next(err);
  }
});

/** GET /api/teams/:id */
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid team id' });

    const team = await getTeamById(id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  } catch (err) {
    next(err);
  }
});

export default router;
