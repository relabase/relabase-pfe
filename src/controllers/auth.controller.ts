import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { UserService } from '@/services/users.service';
import { CLIENT_ID } from '@config';
import { User_requestService } from '@/services/user_requests.service';
import { User_request } from '@/models/user_request';

const userService = Container.get(UserService);
const userRequestService = Container.get(User_requestService);

export class AuthController {
  public verifyIdToken = async (token: string): Promise<TokenPayload> => {
    try {
      const ticket = await new OAuth2Client().verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
      });
      return ticket.getPayload();
    } catch (error) {
      return null;
    }
  };

  public userExists = async (id: string) => {
    return await userService.findUserByGoogleId(id);
  }

  public userRequestExists = async (id: string) => {
    return await userRequestService.findUser_requestByGoogleId(id);
  }

  public redirect = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      let token: string = String(req.body.credential);
      const payload: TokenPayload = await this.verifyIdToken(token);
      if (payload != null) {
        if (await this.userExists(payload.sub)) {
          res.cookie('authToken', token, { httpOnly: true });
          res.status(200).json({ success : true, redirectUrl: 'home' });
        } else {
          const userRequest: User_request = await this.userRequestExists(payload.sub);
          const status: string = userRequest.status.name_status;
          if (userRequest) {
            if (status == "in progress") {
              res.status(200).json({ success : false, message: 'Your account has a pending application. Please wait for the application to be processed before you can log in.' });
            } else if (status == "rejected") {
              res.status(200).json({ success : false, message: 'Your account application was rejected.' });
            }
          } else {
            res.cookie('authToken', token, { httpOnly: true });
            res.status(200).json({ success : true, redirectUrl: 'register' });
          }
        }
      } else {
        res.status(200).json({ success : true, redirectUrl: 'login' });
      }
    } catch (error) {
      res.status(401).json({success : false,  msg: 'error' });
    }
  }

  public getClientId = (req: RequestWithUser, res: Response, next: NextFunction) => {
    res.status(302).json({id: CLIENT_ID});
  }

  public getLoginPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.render('login');
    } catch (error) {
      next(error);
    }
  };

  public getRegisterPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token: TokenPayload = (await this.verifyIdToken(req.cookies.authToken));
      res.render('register', { token });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.cookie('authToken', '', { httpOnly: true });
      res.status(200).json({ redirectUrl: 'login' });
    } catch (error) {
      next(error);
    }
  };


  // public auth = Container.get(AuthService);

  // public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userData: User = req.body;
  //     const signUpUserData: User = await this.auth.signup(userData);

  //     res.status(201).json({ data: signUpUserData, message: 'signup' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userData: User = req.user;
  //     const logOutUserData: User = await this.auth.logout(userData);

  //     res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
  //     res.status(200).json({ data: logOutUserData, message: 'logout' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
