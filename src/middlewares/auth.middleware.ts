import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { AuthController } from '@controllers/auth.controller'

const getToken = (req: RequestWithUser): string => {
  return req.cookies.authToken;
};

export const AuthMiddleware = (requestedPage?: string) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const validToken: boolean = (await (new AuthController()).verifyIdToken(getToken(req))) != null;
    if (validToken) {
      if (requestedPage === 'login') { // if there IS a valid token and the requested page is login, redirect to the homepage
        res.redirect('home');
      }
      else { // if there IS a valid token and the requested page isn't login, go to the requested page
        next();
      }
    }
    else if (requestedPage === 'login') { // if there is NO valid token and the requested page is login, go to the requested page
      next()
    } else { // if there is NO valid token and the requested page isn't login, redirect to the login page
      res.redirect('login');
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
