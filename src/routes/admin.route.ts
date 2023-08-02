import { Router } from 'express';
import { AdminController } from '@controllers/admin.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class AdminRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public admin = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(), this.admin.getAdminPage); //TODO: add with AdminMiddleware
  }
}
