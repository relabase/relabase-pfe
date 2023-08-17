import { Router } from 'express';
import { AdminController } from '@controllers/admin.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AdminMiddleware } from '@/middlewares/admin.middleware';

export class AdminRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public admin = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [AuthMiddleware(), AdminMiddleware], this.admin.getAdminPage);
    this.router.put(`${this.path}/approve_user_application/:id(\\d+)`, [AuthMiddleware(), AdminMiddleware], this.admin.approveUserApplicationAndCreateUser);
  }
}
