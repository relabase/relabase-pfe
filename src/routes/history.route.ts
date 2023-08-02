import { Router } from 'express';
import { HistoryController } from '@controllers/history.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class HistoryRoute implements Routes {
  public path = '/history';
  public router = Router();
  public history = new HistoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(), this.history.getHistoryPage);
  }
}
