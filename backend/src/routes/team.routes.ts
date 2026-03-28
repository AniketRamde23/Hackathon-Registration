import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate, requireRole } from '../middleware/authenticate';
import { createTeam, joinTeamByCode, getMyTeam, getTeamById, updateTeam, removeMember, getAllTeams } from '../controllers/team.controller';

const router = Router();

// Validation Rules
const teamValidation = [
  body('name').isString().trim().isLength({ min: 3, max: 50 }).matches(/^[a-zA-Z0-9\\s]+$/).withMessage('Name must be 3-50 alphanumeric characters'),
];

const joinValidation = [
  body('inviteCode').isString().trim().isLength({ min: 6 }),
];

const updateValidation = [
  body('projectName').optional().isString().trim().isLength({ max: 100 }),
  body('projectDescription').optional().isString().trim().isLength({ max: 500 }),
];

router.post('/', authenticate, teamValidation, createTeam);
router.post('/join', authenticate, joinValidation, joinTeamByCode);
router.get('/my', authenticate, getMyTeam);
router.get('/', authenticate, requireRole(['admin', 'moderator']), getAllTeams);
router.get('/:id', authenticate, getTeamById);
router.put('/:id', authenticate, updateValidation, updateTeam);
router.delete('/:id/members/:uid', authenticate, removeMember);

export default router;
