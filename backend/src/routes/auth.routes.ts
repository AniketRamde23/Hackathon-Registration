import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '../config/firebase';
import User from '../models/User.model';
import { env } from '../config/env';
import { authenticate } from '../middleware/authenticate';

const router = Router();

// OAuth2 Google SSO is intrinsically handled by Frontend Firebase SDK
router.post('/sync', async (req: Request, res: Response): Promise<any> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }

  const token = authHeader.split('Bearer ')[1];
  const { uid } = req.body;

  try {
    const decodedToken = await auth.verifyIdToken(token);
    if (decodedToken.uid !== uid) {
      return res.status(403).json({ error: 'UID mismatch' });
    }

    let user = await User.findOne({ firebaseUid: uid });
    
    if (!user) {
      user = new User({
        firebaseUid: uid,
        email: decodedToken.email,
        name: decodedToken.name || '',
        role: 'participant',
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role, firebaseUid: user.firebaseUid },
      env.JWT_SECRET as string,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );

    // SECURE HTTPONLY COOKIE INJECTION
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({
      success: true,
      jwt: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error('Sync Error:', error);
    return res.status(401).json({ error: 'Unauthorized or token invalid' });
  }
});

// LOGOUT - Destroy HttpOnly Cookie stopping Replay attacks
router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  return res.json({ success: true, message: 'Logged out cleanly' });
});

router.get('/me', authenticate, async (req: Request, res: Response): Promise<any> => {
  if (!req.user || !req.user.dbUser) {
    return res.status(404).json({ error: 'User not found in DB' });
  }
  return res.json({ user: req.user.dbUser });
});

router.post('/verify-otp', async (req: Request, res: Response): Promise<any> => {
  const { code, to } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: 'Code is required' });
  }

  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
    const authToken = process.env.TWILIO_AUTH_TOKEN || '';
    const serviceSid = process.env.TWILIO_SERVICE_SID || '';

    if (!authToken || !accountSid) {
      return res.status(500).json({ success: false, error: 'Twilio Auth Token missing in environment' });
    }

    const params = new URLSearchParams();
    params.append('Code', code);
    if (to) {
      params.append('To', to);
    }

    const response = await fetch(`https://verify.twilio.com/v2/Services/${serviceSid}/VerificationCheck`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const data = await response.json() as any;

    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: data.message || 'Verification failed' });
    }

    return res.json({ success: true, data });
  } catch (error: any) {
    console.error('Twilio Verification Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
