import { NextFunction, Request, Response } from 'express';

export class HistoryController {
  public getHistoryPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.render('history');
    } catch (error) {
      next(error);
    }
  };
}
