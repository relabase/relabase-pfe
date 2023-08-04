import { NextFunction, Request, Response } from 'express';

export class StyleGuideController {
  public getStyleGuide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.render('styleguide');
    } catch (error) {
      next(error);
    }
  };
}
