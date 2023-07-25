import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { UserService } from '@/services/users.service';
import { CLIENT_ID } from '@config';

const userService = Container.get(UserService);

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

  public redirect = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      let token: string = String(req.body.credential);
      const payload: TokenPayload = await this.verifyIdToken(token);
      if (payload != null) {
        if (await this.userExists(payload.sub)) {
          res.cookie('authToken', token, { httpOnly: true });
          res.status(200).json({ redirectUrl: 'home' });
        } else {
          res.status(200).json({ redirectUrl: 'register' });
        }
      } else {
        res.status(200).json({ redirectUrl: 'login' });
      }
    } catch (error) {
      res.status(401).json({ msg: 'error' });
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
      res.render('register');
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
