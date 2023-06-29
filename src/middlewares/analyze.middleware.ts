import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';

const verifyScript = (req: Request): string => {
  return String(req.body.script);
};

export const AnalyzeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Valid = verifyScript(req);
    if (Valid) {
        next();
    } else if (Valid.trimEnd().trimStart().length == 0) {
        next(new HttpException(404, 'script empty'));
    } else {
        next(new HttpException(404, 'Error happened'));
    }
  } catch (error) {
    next(new HttpException(401, 'Error happened'));
  }
};
