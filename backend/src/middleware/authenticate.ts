import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import User from '../models/User.model';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token = req.cookies.token || req.cookies.jwt_auth;

  // Fallback for isolated mobile app connections
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split('Bearer ')[1];
  }

  if (!token) {
    res.status(401).json({ error: 'Missing secure HTTPOnly authentication payload' });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET as string) as any;
    
    // Find the user mapped into MongoDB memory
    const user = await User.findById(decodedToken.id);
    
    if (!user) {
      res.status(401).json({ error: 'Database User Sync completely misaligned' });
      return;
    }

    // Attach verified user directly back across Express req boundaries
    req.user = {
      firebaseUid: user.firebaseUid,
      email: user.email,
      dbUser: user
    };
    
    next();
  } catch (error: any) {
    res.status(401).json({ error: 'Invalid, forged, or expired Runtime Session Token' });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !req.user.dbUser) {
      res.status(403).json({ error: 'Access denied. Physical scope empty.' });
      return;
    }
    
    if (!roles.includes(req.user.dbUser.role)) {
      res.status(403).json({ error: 'Access denied. Insufficient role permissions.' });
      return;
    }
    
    next();
  };
};
