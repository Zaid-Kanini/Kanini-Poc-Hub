import { Router } from 'express';
import { findUserByEmail, getUserById } from '../services/userService.js';
import { signToken, authenticate } from '../middleware/auth.js';

const router = Router();

/**
 * POST /api/auth/login
 * Body: { email: string }
 * Returns a JWT and user profile. Creates the user if they don't exist.
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'A valid work email is required' });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'No account found with this email' });
    }
    const token = signToken(user);

    res.json({ token, user });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/auth/me
 * Returns the currently authenticated user's profile.
 */
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export default router;
