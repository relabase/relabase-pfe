import { Router } from 'express';
import { HomeController } from '@controllers/home.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';

export class HomeRoute implements Routes {
  public router = Router();
  public home = new HomeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', AuthMiddleware(), this.home.getHomePage);
    this.router.get('/home', AuthMiddleware(), this.home.getHomePage);
  }
}
