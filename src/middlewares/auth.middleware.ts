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
    token = token === undefined ? null : token;
    if (token) {
      if (requestedPage === 'login') {
        res.redirect('home');
      } else {
        next();
      }
    } else {
      res.redirect('login');
      //error
      //you must be logged in to access this page
      //create an error page that displays a 404 or unauthorized access message
      //that page will contain none of the navbar options except for the logo and a login button in the corner where john doe usually is
    }

  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
