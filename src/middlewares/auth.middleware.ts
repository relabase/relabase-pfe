import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { AuthController } from '@controllers/auth.controller'

const getToken = (req: RequestWithUser): string => {
  return req.cookies.authToken;
};

export const AuthMiddleware = (requestedPage?: string) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    let token: string = getToken(req);
    if (token) {
      if (requestedPage === 'login') { // if there IS a token and the requested page is login, redirect to the homepage
        res.redirect('home');
      } else { // if there IS a token and the requested page isn't login
        next();
      }
    } else if (requestedPage === 'login') { // if NO token and the requested page is login, 
      next()
    } else { // if NO token and the requested page isn't login
      res.redirect('login');
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
