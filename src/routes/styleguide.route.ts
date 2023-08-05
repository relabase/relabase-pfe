import { Router } from 'express';
import { StyleGuideController } from '@controllers/style_guide.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class StyleGuideRoute implements Routes {
  public path = '/styleguide';
  public router = Router();
  public style = new StyleGuideController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(), this.style.getStyleGuide);
  }
}
