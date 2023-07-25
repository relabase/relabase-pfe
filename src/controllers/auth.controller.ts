import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { UserService } from '@/services/users.service';
import { CLIENT_ID } from '@config';

const userService = Container.get(UserService);

export class AuthController {
  public verifyIdToken = async (req: Request, res: Response): Promise<TokenPayload> => {
    const idToken: string = String(req.body.credential);
    const ticket = await new OAuth2Client().verifyIdToken({
      idToken,
      audience: CLIENT_ID
    });
    return ticket.getPayload();
  };

  public userExists = async (id: string): Promise<User> => {
    return await userService.findUserByGoogleId(id);
  }

  public redirect = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: TokenPayload = await this.verifyIdToken(req, res);
      if (this.userExists(payload.sub)) {
        res.cookie('authToken', String(req.body.credential), { httpOnly: true });
        res.status(200).json({ redirectUrl: 'home' });
      } else {
        res.status(200).json({ redirectUrl: 'register' });
      }
    } catch (error) {
      res.status(401).json({ msg: 'error' });
    }
  }

  public getClientId = (req: RequestWithUser, res: Response, next: NextFunction) => {
    res.status(302).json({id: CLIENT_ID});
  }


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

  // public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userData: User = req.body;
  //     const { cookie, findUser } = await this.auth.login(userData);

  //     res.setHeader('Set-Cookie', [cookie]);
  //     res.status(200).json({ data: findUser, message: 'login' });
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
