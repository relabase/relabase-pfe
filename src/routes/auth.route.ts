import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/logout', this.auth.logOut);
    this.router.get('/login', AuthMiddleware('login'), this.auth.getLoginPage);
    this.router.post('/authenticate', this.auth.redirect);
    this.router.get('/authenticate/client-id', this.auth.getClientId);
    this.router.get('/register', AuthMiddleware('register'), this.auth.getRegisterPage)
  }
}
