import { NextFunction, Request, Response } from 'express';

export class AdminController {
  public getAdminPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.render('admin');
    } catch (error) {
      next(error);
    }
  };
}
