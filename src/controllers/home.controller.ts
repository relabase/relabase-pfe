import { NextFunction, Request, Response } from 'express';

export class HomeController {
  public getHomePage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.render('home');
    } catch (error) {
      next(error);
    }
  };
}
