import { NextFunction, Request, Response } from 'express';

export class HelpController {
  public getHelpPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.render('help');
    } catch (error) {
      next(error);
    }
  };
}
