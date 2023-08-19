import { Router } from 'express';
import { DownloadController } from '@controllers/download.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AdminMiddleware } from '@/middlewares/admin.middleware';

export class DownloadRoute implements Routes {
  public path = '/download';
  public router = Router();
  public download = new DownloadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/script/:type/:filename`, AuthMiddleware(), this.download.getFile);
    this.router.get(`${this.path}/image/:filename`, [AuthMiddleware(), AdminMiddleware], this.download.getImageFile);
  }
}
