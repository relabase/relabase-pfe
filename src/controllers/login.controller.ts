import { NextFunction, Request, Response } from 'express';

export class LoginController {
  public getLoginPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.sendFile('login.html', { root: './src/views' });
    } catch (error) {
      next(error);
    }
  };
}
