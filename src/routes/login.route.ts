import { Router } from 'express';
import { LoginController } from '@controllers/login.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class LoginRoute implements Routes {
  public path = '/login';
  public router = Router();
  public login = new LoginController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware('login'), this.login.getLoginPage);
  }
}
