import { Request, Response, NextFunction } from 'express';
declare module 'express-session' {
  interface SessionData {
    teamId?: string;
  }
}

export default function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.teamId) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}
