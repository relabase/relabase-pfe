import { Router } from 'express';
import { HomeController } from '@controllers/home.controller';
import { Routes } from '@interfaces/routes.interface';

export class HomeRoute implements Routes {
  public router = Router();
  public home = new HomeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/home', this.home.getHomePage);
  }
}
