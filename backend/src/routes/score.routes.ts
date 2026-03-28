import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { submitScore, getMyScores, getTeamScores, getLeaderboard } from '../controllers/score.controller';

const router = Router();

router.post('/', authenticate, authorize('judge'), submitScore);
router.get('/my', authenticate, authorize('judge'), getMyScores);
router.get('/team/:teamId', authenticate, authorize('admin', 'moderator'), getTeamScores);

// Leaderboard serves public viewings so no auth checks natively required
router.get('/leaderboard', getLeaderboard);

export default router;
