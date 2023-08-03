import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { AuthController } from '@controllers/auth.controller'
import { TokenPayload } from 'google-auth-library';
import { User } from '@/models/user';

const getToken = (req: RequestWithUser): string => {
  return req.cookies.authToken;
};

export const AuthMiddleware = (requestedPage?: string) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const controller = new AuthController();
    const token: TokenPayload = (await controller.verifyIdToken(getToken(req)));
    const user: User = (await controller.userExists(token?.sub));
    req.token_payload = token;
    if (token && user) { // if a user is logged in
      if (requestedPage === 'login' || requestedPage === 'register') { // and they want to access these pages
        res.redirect('/home'); // redirect to homepage
      } else { // otherwise, let them through
        next();
      }
    } else if (token && user == null) { // if a user has selected a google account but doesn't own a relabase account
      if (requestedPage === 'login' || requestedPage === 'register') { // and they want to access these pages
        next(); // let them through
      } else { // otherwise, redirect to login
        res.redirect('/login');
      }
    //} else if () { // if a user has selected a google account that has a pending application

    } else if (token == null) { // if a user who has not selected a google account
      if (requestedPage === 'login') { // tries to log in
        next(); // let them through
      } else { // otherwise, redirect to login
        res.redirect('/login');
      }
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
