import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';

export class HelpController {
  public getHelpPage = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.render('help', { currentUser: `${req.user.first_name} ${req.user.last_name}` });
    } catch (error) {
      next(error);
    }
  };
}
