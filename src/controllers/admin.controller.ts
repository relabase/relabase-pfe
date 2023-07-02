import { NextFunction, Request, Response } from 'express';

export class AdminController {
  public getAdminPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.sendFile('admin.html', { root: './src/views' });
    } catch (error) {
      next(error);
    }
  };
}
