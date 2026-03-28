import { Request, Response, NextFunction } from 'express';

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): any => {
    if (!req.user || !req.user.dbUser) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    
    if (!roles.includes(req.user.dbUser.role)) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }
    
    next();
  };
};
