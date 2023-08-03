import { Router } from 'express';
import { AnalyzeController } from '@/controllers/analyze.controller';
import { Routes } from '@interfaces/routes.interface';
import { AnalyzeMiddleware } from '@/middlewares/analyze.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class AnalyzeRoute implements Routes {
  public path = '/analyze';
  public router = Router();
  public analyze = new AnalyzeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(), this.analyze.getView);
    this.router.post(`${this.path}`, [AuthMiddleware(), AnalyzeMiddleware], this.analyze.sendScript);
  }
}
