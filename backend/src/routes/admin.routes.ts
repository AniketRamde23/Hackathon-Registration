import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { getRegistrations, getAnalytics, getAllUsers, updateUserRole, getAllTeams, requestOtp, verifyOtp, deleteRegistration } from '../controllers/admin.controller';

const router = Router();

// Public Authentication Endpoints (Must be placed explicitly BEFORE the secure authorize wrapper)
router.post('/auth/request-otp', requestOtp);
router.post('/auth/verify-otp', verifyOtp);

// Globally enforce elevated administrative rights for all remaining Analytics/Scoring endpoints
router.use(authenticate, authorize('admin', 'moderator'));

router.get('/registrations', getRegistrations);
router.delete('/registrations/:id', deleteRegistration);
router.get('/analytics', getAnalytics);
router.get('/users', getAllUsers);

// Overriding secondary authorize logic so only explicitly labeled `admins` execute promotions
router.put('/users/:id/role', authorize('admin'), updateUserRole); 
router.get('/teams', getAllTeams);

export default router;
